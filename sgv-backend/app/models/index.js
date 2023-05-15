const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.categoria = require("./categoria.model");
db.producto = require("./producto.model");
db.venta = require("./venta.model");
db.detalleventa = require("./detalleventa.model");
db.ventacontador = require("./ventacontador.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;