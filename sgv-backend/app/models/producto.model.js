const mongoose = require("mongoose");

const Producto = mongoose.model(
  "Producto",
  new mongoose.Schema({
    descripcion: String,
    valor_producto: Number,
    categoria:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria"
    },
    tipo_producto: String
  })
);

module.exports = Producto;