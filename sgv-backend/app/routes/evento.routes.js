module.exports = app => {
    const eventos = require("../controllers/evento.controller");
  
    var router = require("express").Router();

    // Create a new Evento
    router.post("/crear", eventos.create);
  
    // Retrieve all Eventos
    router.get("/listar", eventos.findAll);
  
    // Retrieve a single Evento with id
    router.get("/buscar/:id", eventos.findOne);
  
    // Update a Evento with id
    router.put("/:id", eventos.update);
  
    // Delete a Evento with id
    router.delete("/borrar/:id", eventos.delete);
  
    // Create a new Evento
    router.delete("/borrar", eventos.deleteAll);
  
}