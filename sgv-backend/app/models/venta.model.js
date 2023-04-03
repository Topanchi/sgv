const mongoose = require("mongoose");

const Venta = mongoose.model(
  "Venta",
  new mongoose.Schema({
    valor_venta: Number,
    fecha_ingreso: {type: Date, default: Date.now},
    fecha_venta: String,
    mes: Number,
    anio: Number,
    descripcion_venta: String,
    nombre_cliente: String,
    iduser: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
  })
);

module.exports = Venta;