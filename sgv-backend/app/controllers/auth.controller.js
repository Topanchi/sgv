const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const user = new User({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (req.body.roles) {
            Role.find(
            {
                name: { $in: req.body.roles }
            },
            (err, roles) => {
                if (err) {
                res.status(500).send({ message: err });
                return;
                }

                user.roles = roles.map(role => role._id);
                user.save(err => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                res.send({ message: "Usuario registrado exitosamente!!" });
                });
            });
        } else {
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                    res.status(500).send({ message: err });
                    return;
                    }

                    res.send({ message: "Usuario registrado exitosamente!!" });
                });
            });
        }
    });
};

exports.signin = (req, res) => {
    User.findOne({
        email: req.body.email
    }).populate("roles", "-__v").exec((err, user) => {

        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user) {
            return res.status(404).send({ message: "Usuario no encontrado." });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
            accessToken: null,
            message: "Contraseña inválida!"
            });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        var authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        res.status(200).send({
            id: user._id,
            nombre: user.nombre,
            apellidos: user.apellidos,
            email: user.email,
            roles: authorities,
            accessToken: token
        });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { $regex: new RegExp(nombre), $options: "i" } } : {};

    User.find(condition).then(data => {
            res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving usuarios."
        });
    });
  
};