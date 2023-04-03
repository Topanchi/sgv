const mongoose = require("mongoose");

const Categoria = mongoose.model(
  "Categoria",
  new mongoose.Schema({
    titulo: String,
    descripcion: String
  })
);

module.exports = Categoria;