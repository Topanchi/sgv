const mongoose = require("mongoose");

const Evento = mongoose.model(
  "Evento",
  new mongoose.Schema({
    valor_factura: Number,
    num_factura: Number,
    golsa_factura: String,
    cotizacion: String,
    tiene_oc: Boolean,
    orden_compra: String,
    fecha_ingreso: {type: Date, default: Date.now},
    fecha_venta: String,
    esta_pagada: Boolean,
    mes: Number,
    anio: Number,
    iduser: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
      }
  })
);

module.exports = Evento;