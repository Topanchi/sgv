module.exports = app => {
    const productos = require("../controllers/producto.controller");
  
    var router = require("express").Router();
  
    // Create a new Producto
    router.post("/crear", productos.create);
  
    // Retrieve all Productos
    router.get("/listar", productos.findAll);
  
    // Retrieve a single Producto with id
    router.get("/:id", productos.findOne);
  
    // Update a Producto with id
    router.put("/:id", productos.update);
  
    // Delete a Producto with id
    router.delete("/:id", productos.delete);
  
    // Create a new Producto
    router.delete("/borrar", productos.deleteAll);
  
    app.use("/api/productos", router);
};