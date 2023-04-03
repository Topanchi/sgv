const db = require("../models");
const Categoria = db.categoria;

// Create and Save a new Categoria
exports.create = (req, res) => {
    // Validate request
    if (!req.body.titulo) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Categoria
    const categoria = new Categoria({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion
    });

    // Save Categoria in the database
    categoria.save(categoria).then(data => {
            res.status(200).send({ message: "Categoría creada con éxito!" });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Categoria."
            });
        });
};

// Retrieve all Categoria from the database.
exports.findAll = (req, res) => {
    const titulo = req.query.titulo;
    var condition = titulo ? { titulo: { $regex: new RegExp(titulo), $options: "i" } } : {};

    Categoria.find(condition).then(data => {
            res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving categorias."
        });
    });
  
};

// Find a single Categoria with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Categoria.findById(id).then(data => {
        if (!data)
            res.status(404).send({ message: "Not found Categoria with id " + id });
        else res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: "Error retrieving Categoria with id=" + id });
    });
};

// Update a Categoria by the id in the request
exports.update = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;

    Categoria.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update Categoria with id=${id}. Maybe Categoria was not found!`
            });
        } else res.send({ message: "Categoria was updated successfully." });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Categoria with id=" + id
        });
    });
};

// Delete a Categoria with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Categoria.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete Categoria with id=${id}. Maybe Categoria was not found!`
            });
        } else {
            res.send({
                message: "Categoria was deleted successfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Categoria with id=" + id
        });
    });
};

// Delete all Categorias from the database.
exports.deleteAll = (req, res) => {

    Categoria.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} Categorias were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing all categorias."
        });
    });
};
