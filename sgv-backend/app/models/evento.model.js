const mongoose = require("mongoose");

const Evento = mongoose.model(
  "Evento",
  new mongoose.Schema({
    valor_factura: Number,
    num_factura: Number,
    golsa_factura: String,
    fecha_factura: String,
    tiene_factura: { type: mongoose.Schema.Types.ObjectId, ref: 'FacturaEvento' },
    tiene_cotizacion: { type: mongoose.Schema.Types.ObjectId, ref: 'CotizacionEvento' },
    cotizacion: String,
    tiene_oc: { type: mongoose.Schema.Types.ObjectId, ref: 'OCEvento' },
    orden_compra: String,
    esta_pagada: Boolean,
    fecha_ingreso: {type: Date, default: Date.now},
    mes: Number,
    anio: Number,
    iduser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  })
);

module.exports = Evento;