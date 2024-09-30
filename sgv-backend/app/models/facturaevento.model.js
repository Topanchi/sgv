const mongoose = require("mongoose");

const FacturaEvento = mongoose.model(
  "FacturaEvento",
  new mongoose.Schema({
    nombre_doc: String,
    tipo_doc: String,
    tamanio_doc: Number,
    file: Buffer, // Almacena el archivo PDF como un buffer
  })
);

module.exports = FacturaEvento;