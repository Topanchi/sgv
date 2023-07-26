const mongoose = require("mongoose");

const MontoVentaContador = mongoose.model(
  "MontoVentaContador",
  new mongoose.Schema({
    fecha_ingreso: {type: Date, default: Date.now},
    total_venta: Number,
    fecha_venta: String,
    mes: Number,
    anio: Number,
    producto_vendido: String,
    tipo_producto: String,
    valor_producto_vendido: Number 
  })
);

module.exports = MontoVentaContador;