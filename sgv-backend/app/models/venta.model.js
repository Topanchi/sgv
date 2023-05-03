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
    torta_bizcocho_15_redonda: Number,
    torta_bizcocho_20_redonda: Number,
    torta_bizcocho_30_redonda: Number,
    torta_bizcocho_40_redonda: Number,
    torta_bizcocho_50_redonda: Number,
    torta_bizcocho_15_rectangular: Number,
    torta_bizcocho_30_rectangular: Number,
    torta_bizcocho_40_rectangular: Number,
    torta_bizcocho_60_rectangular: Number,
    torta_especial_12_panqueque: Number,
    torta_especial_20_panqueque: Number,
    torta_especial_30_panqueque: Number,
    torta_especial_15_hojarasca_milhoja: Number,
    torta_especial_20_hojarasca_milhoja: Number,
    torta_especial_30_hojarasca_milhoja: Number,
    iduser: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
  })
);

module.exports = Venta;