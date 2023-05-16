const mongoose = require("mongoose");

const MontoVentaContador = mongoose.model(
  "MontoVentaContador",
  new mongoose.Schema({
    fecha_ingreso: {type: Date, default: Date.now},
    fecha_venta: String,
    mes: Number,
    anio: Number
  })
);

module.exports = MontoVentaContador;