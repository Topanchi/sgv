const db = require("../models");
const Venta = db.venta;
const DetalleVenta = db.detalleventa;
var detalle = new Array(DetalleVenta());

// Create and Save a new Venta
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Venta
    const venta = new Venta({
        valor_venta: req.body.valor_venta,
        fecha_venta: req.body.fecha_venta,
        mes: req.body.mes,
        anio: req.body.anio,
        descripcion_venta: req.body.descripcion_venta,
        nombre_cliente: req.body.nombre_cliente,
        iduser: req.body.iduser
    });

    venta.save(venta).then((data) => {
        if(data){
            console.log(data);
            let detalles = req.body.detalles;

            detalles.forEach((element, index) => {
                var detalleVenta = new DetalleVenta();
                detalleVenta.idProducto = element.idproducto;
                detalleVenta.cantidad = +element.cantidad;
                detalleVenta.venta = data._id;

                detalleVenta.save(detalleVenta).then(resp => {
                    res.end();
                }).catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the Detalle Venta."
                    });
                });
                
            });
        }
        
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Venta."
        });
    });
  
};

// Retrieve all Ventas from the database.
exports.findAll = (req, res) => {
    const valor_venta = req.query.valor_venta;
    var condition = valor_venta ? { valor_venta: { $regex: new RegExp(valor_venta), $options: "i" } } : {};

    Venta.find(condition).populate('iduser').then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving ventas."
        });
    });
  
};

// Find a single Venta with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Venta.findById(id).populate('iduser').then(data => {
        if (!data){
            res.status(404).send({ message: "Not found Venta with id " + id });
        }else{
            DetalleVenta.find({venta:id}).populate('idProducto').then(data_detalle => {
                if(data_detalle){
                    console.log(data_detalle);
                    res.status(200).send({
                        venta: data,
                        detalles: data_detalle
                    });
                }
            });
  
        }
    })
    .catch(err => {
        res.status(500).send({ message: "Error retrieving Venta with id=" + id });
    }); 
};

// Update a Venta by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Venta with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    /** Busco el id del detalle */
    DetalleVenta.find({venta:id}).then(data_detalle => {
        if(data_detalle){
            console.log("---->> ENCONTRÉ DETALLES");
            detalle = data_detalle;
            console.log(detalle);
            /** Borro el detalle */
            DetalleVenta.findByIdAndRemove(detalle[0]._id, { useFindAndModify: false }).then(data_detalle_borrar => {
                if (!data_detalle_borrar) {
                    console.log("---> No encontré el detalle")
                } else {
                    console.log("---> Encontré el detalle y lo borro")
                }
            }).catch(err => {
                res.status(500).send({ message: "Error retrieving Detalle with id=" + id });
            });
        }
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while searching the Venta."
        });
    });

    /** Borro la venta */
    Venta.findByIdAndRemove(id, { useFindAndModify: false }).then(data => {
        if (!data){
            res.status(404).send({ message: "Not found Venta with id " + id });
        }else{
            res.status(200).send({
                message: "Venta was deleted successfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({ message: "Error retrieving Venta with id=" + id });
    }); 
/**/
};

// Delete all Ventas from the database.
exports.deleteAll = (req, res) => {
  
};


/* DetalleVenta.findByIdAndRemove({detalles:_id}).then(data_detalle_borrar => {
                if (!data_detalle_borrar) {
                    console.log("---> No encontré el detalle")
                    res.status(404).send({
                        message: `Cannot delete Venta with id=${id}. Maybe Venta was not found!`
                    });
                } else {
                    console.log("---> Encontré el detalle y lo borro")
                   
                    Venta.findByIdAndRemove(id, { useFindAndModify: false }).then(data_borrar => {
                        if (!data_borrar) {
                            console.log("---> No encontré la venta")
                            res.status(404).send({
                                message: `Cannot delete Venta with id=${id}. Maybe Venta was not found!`
                            });
                        } else {
                            res.send({
                                message: "Venta was deleted successfully!"
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Could not delete Venta with id=" + id
                        });
                    }); 
                }
            }); */