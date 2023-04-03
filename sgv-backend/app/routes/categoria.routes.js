module.exports = app => {
    const categorias = require("../controllers/categoria.controller");
  
    var router = require("express").Router();
  
    // Create a new Categoria
    router.post("/crear", categorias.create);
  
    // Retrieve all Categorias
    router.get("/listar", categorias.findAll);
  
    // Retrieve a single Categoria with id
    router.get("/:id", categorias.findOne);
  
    // Update a Categoria with id
    router.put("/:id", categorias.update);
  
    // Delete a Categoria with id
    router.delete("/:id", categorias.delete);
  
    // Create a new Categoria
    router.delete("/borrar", categorias.deleteAll);
  
    app.use("/api/categorias", router);
};