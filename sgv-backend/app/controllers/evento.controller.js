const db = require("../models");

const Evento = db.evento;

// Retrieve all Eventos from the database.
exports.findAll = (req, res) => {
    const valor_factura = req.query.valor_factura;
    let condition = valor_factura ? { valor_factura: { $regex: new RegExp(valor_factura), $options: "i" } } : {};

    Evento.find(condition).populate('iduser').then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving eventos."
        });
    });
  
};

// Find a single Evento with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Evento.findById(id).populate('iduser').then(data => {
        if (!data){
            res.status(404).send({ message: "Not found Evento with id " + id });
        }else{
            res.send(data);
  
        }
    })
    .catch(err => {
        res.status(500).send({ message: "Error retrieving Evento with id=" + id });
    }); 
};