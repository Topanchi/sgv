module.exports = app => {
    const file = require("../controllers/file.controller");
    
    const multer = require('multer');
    // Configuración de Multer para la carga de archivos
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });
  
    let router = require("express").Router();

    // Create a new FacturaEvento
    router.post("/cargar-factura", upload.single('file'),file.createFacturaEvento);

    // Create a new CotizacionEvento
    router.post("/cargar-cotizacion", file.createCotizacionEvento);

    // Create a new OCEvento 
    router.post("/cargar-orden-compra",  file.createOCEvento);
  
    // Retrieve all Eventos
    //router.get("/listar", file.findAll);
  
    // Retrieve a single Evento with id
    //router.get("/buscar/:id", file.findOne);
  
    // Update a Evento with id
    //router.put("/:id", eventos.update);
  
    // Delete a Evento with id
    //router.delete("/borrar/:id", eventos.delete);
  
    // Create a new Evento
    //router.delete("/borrar", eventos.deleteAll);

    app.use("/api/eventos", router);
  
}