const db = require("../models");

const Evento = db.evento;

// Create and Save a new Evento
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Evento
    const evento = new Evento({
        valor_factura: +req.body.valor_factura,
        num_factura: +req.body.num_factura,
        golsa_factura: req.body.golsa_factura,
        tiene_factura: req.body.tiene_factura,
        cotizacion: req.body.cotizacion,
        tiene_oc: req.body.tiene_oc,
        orden_compra: req.body.orden_compra,
        fecha_venta: req.body.fecha_venta,
        esta_pagada: req.body.esta_pagada,
        mes: +req.body.mes,
        anio: +req.body.anio,
        iduser: req.body.iduser
    });

    console.log("obj evento: ", evento);

    evento.save(evento).then((data) => {
        console.log(data);
        res.status(200).send({ message: "Evento creado con éxito!" });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Evento."
        });
    });
  
};

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