const mongoose = require("mongoose");

const DetalleVenta = mongoose.model(
  "DetalleVenta",
  new mongoose.Schema({
    idProducto: {type: mongoose.Schema.Types.ObjectId, ref: 'Producto'},
    cantidad: Number,
    venta: {type: mongoose.Schema.Types.ObjectId, ref: 'Venta'},
  })
);

module.exports = DetalleVenta;