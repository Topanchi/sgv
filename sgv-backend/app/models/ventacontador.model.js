const mongoose = require("mongoose");

const VentaContador = mongoose.model(
  "VentaContador",
  new mongoose.Schema({
    fecha_ingreso: {type: Date, default: Date.now},
    fecha_venta: String,
    mes: Number,
    anio: Number,
    producto_vendido: String
  })
);

module.exports = VentaContador;