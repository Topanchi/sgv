const mongoose = require("mongoose");

const CotizacionEvento  = mongoose.model(
  "CotizacionEvento ",
  new mongoose.Schema({
    nombre_doc: String,
    tipo_doc: String,
    tamanio_doc: Number,
    file: Buffer, // Almacena el archivo PDF como un buffer
  })
);

module.exports = CotizacionEvento ;