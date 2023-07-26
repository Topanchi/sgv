const { CONSTANTES_TORTAS } = require('../utils/categoriaconstantes');
const db = require("../models");
const Venta = db.venta;
const VentaContador = db.ventacontador;
const MontoVentaContador = db.montoventacontador;
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
        tipo_producto: req.body.tipo_producto,
        iduser: req.body.iduser,
        torta_bizcocho_15_redonda: req.body.torta_bizcocho_15_redonda,
        torta_bizcocho_20_redonda: req.body.torta_bizcocho_20_redonda,
        torta_bizcocho_30_redonda: req.body.torta_bizcocho_30_redonda,
        torta_bizcocho_40_redonda: req.body.torta_bizcocho_40_redonda,
        torta_bizcocho_50_redonda: req.body.torta_bizcocho_50_redonda,
        torta_bizcocho_15_rectangular: req.body.torta_bizcocho_15_rectangular,
        torta_bizcocho_30_rectangular: req.body.torta_bizcocho_30_rectangular,
        torta_bizcocho_40_rectangular: req.body.torta_bizcocho_40_rectangular,
        torta_bizcocho_60_rectangular: req.body.torta_bizcocho_60_rectangular,
        torta_especial_12_panqueque: req.body.torta_especial_12_panqueque,
        torta_especial_20_panqueque: req.body.torta_especial_20_panqueque,
        torta_especial_30_panqueque: req.body.torta_especial_30_panqueque,
        torta_especial_15_hojarasca_milhoja: req.body.torta_especial_15_hojarasca_milhoja,
        torta_especial_20_hojarasca_milhoja: req.body.torta_especial_20_hojarasca_milhoja,
        torta_especial_30_hojarasca_milhoja: req.body.torta_especial_30_hojarasca_milhoja,
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
exports.update = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;
    const ventaActualizada = await Venta.findByIdAndUpdate(id,req.body, { useFindAndModify: false });

    // Elimina los detalles de venta que no estén incluidos en la petición
    const detallesIds = req.body.detalles.map((detalle) => detalle._id).filter(Boolean);
    await DetalleVenta.deleteMany({ venta: ventaActualizada._id, _id: { $nin: detallesIds } }); 

    // Itera sobre los detalles de venta recibidos en la petición
    for (const detalle of req.body.detalles) {
        // Si el detalle ya existe, actualiza su cantidad
        if (detalle._id) {
            await DetalleVenta.findByIdAndUpdate(detalle._id, { cantidad: detalle.cantidad });
        }
        // Si el detalle es nuevo, crea un nuevo documento y lo agrega a la venta
        else {
            const nuevoDetalle = new DetalleVenta({
                cantidad: detalle.cantidad,
                idProducto: detalle.idproducto,
                venta: ventaActualizada._id
            });

            await nuevoDetalle.save();
        }
    }

    res.status(200).json({ message: 'Venta actualizada con éxito' });
};

// Delete a Venta with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        // Busca la venta por su ID y elimina sus detalles de venta
        await DetalleVenta.deleteMany({ venta: id });
        await Venta.findByIdAndDelete(id);
        
        res.status(200).json({ message: 'Venta eliminada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la venta' });
    }
};

// Delete all Ventas from the database.
exports.deleteAll = (req, res) => {
  
};


// Create and Save a new Venta Contador
exports.createVentaContador = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Venta
    const ventaContador = new VentaContador({
        fecha_venta: req.body.fecha_venta,
        mes: req.body.mes,
        anio: req.body.anio,
        producto_vendido: req.body.producto_vendido,
    });

    ventaContador.save(ventaContador).then((data) => {
        if(data){
            res.status(200).send({
                message:
                    err.message || "Venta Contador guardado con éxito."
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

//Create and save a new Mount Venta
exports.createMontoVentaContador = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    console.log(req.body)

    // Create a Venta
    const montoVentaContador = new MontoVentaContador({
        fecha_venta: req.body.fecha_venta,
        mes: req.body.mes,
        anio: req.body.anio,
        producto_vendido: req.body.producto_vendido,
        tipo_producto: req.body.tipo_producto,
        valor_producto_vendido: req.body.valor_producto_vendido
    });

    console.log(montoVentaContador);

    montoVentaContador.save(montoVentaContador).then((data) => {
        if(data){
            res.status(200).send({
                message:
                    err.message || "Monto Venta Contador guardado con éxito."
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

// Delete all Ventas from the database.
exports.countByMonths = async (req, res) => {
    let producto = " ";

    const cantidadVentas = await VentaContador.countDocuments({ "mes": req.body.mes , "anio": req.body.anio, "producto_vendido": req.body.producto_vendido}).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving ventas."
        });
    });

    console.log("--- Salida :  ", cantidadVentas);

    switch(req.body.producto_vendido){
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_15_REDONDA:
            producto = "15 redonda";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_20_REDONDA:
            producto = "20 redonda";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_30_REDONDA:
            producto = "30 redonda";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_40_REDONDA:
            producto = "40 redonda";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_50_REDONDA:
            producto = "50 redonda";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_15_REECTANGULAR:
            producto = "15 rectangular";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_30_REECTANGULAR:
            producto = "30 rectangular";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_40_REECTANGULAR:
            producto = "40 rectangular";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_60_REECTANGULAR:
            producto = "60 rectangular";
            break;
        case CONSTANTES_TORTAS.TORTA_ESPECIAL_12_PANQUEQUE:
            producto = "12 panqueque";
            break;
        case CONSTANTES_TORTAS.TORTA_ESPECIAL_20_PANQUEQUE:
            producto = "20 panqueque";
            break;
        case CONSTANTES_TORTAS.TORTA_ESPECIAL_30_PANQUEQUE:
            producto = "30 panqueque";
            break;
        case CONSTANTES_TORTAS.TORTA_ESPECIAL_15_HOJARASCA_MILHOJA:
            producto = "15 milhoja";
            break;
        case CONSTANTES_TORTAS.TORTA_ESPECIAL_20_HOJARASCA_MILHOJA:
            producto = "20 milhoja";
            break;
        case CONSTANTES_TORTAS.TORTA_ESPECIAL_30_HOJARASCA_MILHOJA:
            producto = "30 milhoja";
            break;

    }

    res.status(200).send({
        producto,
        cantidadVentas
    });


};

exports.countByYears = async (req, res) => {
    let producto = " ";

    const cantidadVentas = await VentaContador.countDocuments({ "anio": req.body.anio, "producto_vendido": req.body.producto_vendido}).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving ventas."
        });
    });

    console.log("--- Salida :  ", cantidadVentas);

    switch(req.body.producto_vendido){
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_15_REDONDA:
            producto = "15 redonda";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_20_REDONDA:
            producto = "20 redonda";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_30_REDONDA:
            producto = "30 redonda";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_40_REDONDA:
            producto = "40 redonda";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_50_REDONDA:
            producto = "50 redonda";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_15_REECTANGULAR:
            producto = "15 rectangular";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_30_REECTANGULAR:
            producto = "30 rectangular";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_40_REECTANGULAR:
            producto = "40 rectangular";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_60_REECTANGULAR:
            producto = "60 rectangular";
            break;
        case CONSTANTES_TORTAS.TORTA_ESPECIAL_12_PANQUEQUE:
            producto = "12 panqueque";
            break;
        case CONSTANTES_TORTAS.TORTA_ESPECIAL_20_PANQUEQUE:
            producto = "20 panqueque";
            break;
        case CONSTANTES_TORTAS.TORTA_ESPECIAL_30_PANQUEQUE:
            producto = "30 panqueque";
            break;
        case CONSTANTES_TORTAS.TORTA_ESPECIAL_15_HOJARASCA_MILHOJA:
            producto = "15 milhoja";
            break;
        case CONSTANTES_TORTAS.TORTA_ESPECIAL_20_HOJARASCA_MILHOJA:
            producto = "20 milhoja";
            break;
        case CONSTANTES_TORTAS.TORTA_ESPECIAL_30_HOJARASCA_MILHOJA:
            producto = "30 milhoja";
            break;

    }

    res.status(200).send({
        producto,
        cantidadVentas
    });


};

exports.countBythreeMonth = async (req, res) => {
    let producto = " ";

    let mes_uno = req.body.mes_uno;
    let mes_dos = req.body.mes_dos;
    let mes_tres = req.body.mes_tres;

    const cantidadVentas_mes_uno = await VentaContador.countDocuments({ "mes": mes_uno , "anio": req.body.anio, "producto_vendido": req.body.producto_vendido}).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving ventas."
        });
    });

    const cantidadVentas_mes_dos = await VentaContador.countDocuments({ "mes": mes_dos , "anio": req.body.anio, "producto_vendido": req.body.producto_vendido}).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving ventas."
        });
    });

    const cantidadVentas_mes_tres = await VentaContador.countDocuments({ "mes": mes_tres , "anio": req.body.anio, "producto_vendido": req.body.producto_vendido}).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving ventas."
        });
    });

    const cantidadVentas = cantidadVentas_mes_uno + cantidadVentas_mes_dos + cantidadVentas_mes_tres;

    console.log("--- Salida :  ", cantidadVentas);

    switch(req.body.producto_vendido){
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_15_REDONDA:
            producto = "15 redonda";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_20_REDONDA:
            producto = "20 redonda";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_30_REDONDA:
            producto = "30 redonda";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_40_REDONDA:
            producto = "40 redonda";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_50_REDONDA:
            producto = "50 redonda";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_15_REECTANGULAR:
            producto = "15 rectangular";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_30_REECTANGULAR:
            producto = "30 rectangular";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_40_REECTANGULAR:
            producto = "40 rectangular";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_60_REECTANGULAR:
            producto = "60 rectangular";
            break;
        case CONSTANTES_TORTAS.TORTA_ESPECIAL_12_PANQUEQUE:
            producto = "12 panqueque";
            break;
        case CONSTANTES_TORTAS.TORTA_ESPECIAL_20_PANQUEQUE:
            producto = "20 panqueque";
            break;
        case CONSTANTES_TORTAS.TORTA_ESPECIAL_30_PANQUEQUE:
            producto = "30 panqueque";
            break;
        case CONSTANTES_TORTAS.TORTA_ESPECIAL_15_HOJARASCA_MILHOJA:
            producto = "15 milhoja";
            break;
        case CONSTANTES_TORTAS.TORTA_ESPECIAL_20_HOJARASCA_MILHOJA:
            producto = "20 milhoja";
            break;
        case CONSTANTES_TORTAS.TORTA_ESPECIAL_30_HOJARASCA_MILHOJA:
            producto = "30 milhoja";
            break;

    }

    res.status(200).send({
        producto,
        cantidadVentas
    });


};

exports.countBySixMonth = async (req, res) => {
    let producto = " ";

    let mes_uno = req.body.mes_uno;
    let mes_dos = req.body.mes_dos;
    let mes_tres = req.body.mes_tres;
    let mes_cuatro = req.body.mes_cuatro;
    let mes_cinco = req.body.mes_cinco;
    let mes_seis = req.body.mes_seis;

    const cantidadVentas_mes_uno = await VentaContador.countDocuments({ "mes": mes_uno , "anio": req.body.anio, "producto_vendido": req.body.producto_vendido}).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving ventas."
        });
    });

    const cantidadVentas_mes_dos = await VentaContador.countDocuments({ "mes": mes_dos , "anio": req.body.anio, "producto_vendido": req.body.producto_vendido}).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving ventas."
        });
    });

    const cantidadVentas_mes_tres = await VentaContador.countDocuments({ "mes": mes_tres , "anio": req.body.anio, "producto_vendido": req.body.producto_vendido}).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving ventas."
        });
    });

    const cantidadVentas_mes_cuatro = await VentaContador.countDocuments({ "mes": mes_cuatro , "anio": req.body.anio, "producto_vendido": req.body.producto_vendido}).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving ventas."
        });
    });

    const cantidadVentas_mes_cinco = await VentaContador.countDocuments({ "mes": mes_cinco , "anio": req.body.anio, "producto_vendido": req.body.producto_vendido}).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving ventas."
        });
    });

    const cantidadVentas_mes_seis = await VentaContador.countDocuments({ "mes": mes_seis , "anio": req.body.anio, "producto_vendido": req.body.producto_vendido}).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving ventas."
        });
    });

    const cantidadVentas = cantidadVentas_mes_uno + cantidadVentas_mes_dos + cantidadVentas_mes_tres + cantidadVentas_mes_cuatro + cantidadVentas_mes_cinco + cantidadVentas_mes_seis;

    console.log("--- Salida :  ", cantidadVentas);

    switch(req.body.producto_vendido){
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_15_REDONDA:
            producto = "15 redonda";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_20_REDONDA:
            producto = "20 redonda";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_30_REDONDA:
            producto = "30 redonda";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_40_REDONDA:
            producto = "40 redonda";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_50_REDONDA:
            producto = "50 redonda";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_15_REECTANGULAR:
            producto = "15 rectangular";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_30_REECTANGULAR:
            producto = "30 rectangular";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_40_REECTANGULAR:
            producto = "40 rectangular";
            break;
        case CONSTANTES_TORTAS.TORTA_BISCOCHO_60_REECTANGULAR:
            producto = "60 rectangular";
            break;
        case CONSTANTES_TORTAS.TORTA_ESPECIAL_12_PANQUEQUE:
            producto = "12 panqueque";
            break;
        case CONSTANTES_TORTAS.TORTA_ESPECIAL_20_PANQUEQUE:
            producto = "20 panqueque";
            break;
        case CONSTANTES_TORTAS.TORTA_ESPECIAL_30_PANQUEQUE:
            producto = "30 panqueque";
            break;
        case CONSTANTES_TORTAS.TORTA_ESPECIAL_15_HOJARASCA_MILHOJA:
            producto = "15 milhoja";
            break;
        case CONSTANTES_TORTAS.TORTA_ESPECIAL_20_HOJARASCA_MILHOJA:
            producto = "20 milhoja";
            break;
        case CONSTANTES_TORTAS.TORTA_ESPECIAL_30_HOJARASCA_MILHOJA:
            producto = "30 milhoja";
            break;

    }

    res.status(200).send({
        producto,
        cantidadVentas
    });


};

exports.countSalesMountByMonths = async (req, res) => {
    var parametros = { "mes": req.body.mes , "anio": req.body.anio, "tipo_producto": req.body.tipo_producto};
    var venta_total = 0;
     
    const montosEncontrados = await MontoVentaContador.find(parametros).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving ventas."
        });
    });
    
    montosEncontrados.forEach(element => {
        venta_total = venta_total + element.valor_producto_vendido;
    });

    res.status(200).send({
        venta_total
    }); 
    
};


