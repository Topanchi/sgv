module.exports = app => {
    const ventas = require("../controllers/venta.controller");
  
    var router = require("express").Router();
  
    // Create a new Venta
    router.post("/crear", ventas.create);
  
    // Retrieve all Ventas
    router.get("/listar", ventas.findAll);
  
    // Retrieve a single Venta with id
    router.get("/buscar/:id", ventas.findOne);
  
    // Update a Venta with id
    router.put("/:id", ventas.update);
  
    // Delete a Venta with id
    router.delete("/borrar/:id", ventas.delete);
  
    // Create a new Venta
    router.delete("/borrar", ventas.deleteAll);

    // Search Data by months using year 
    router.post("/buscar-ventas", ventas.countByMonths);

    // Search Data by year 
    router.post("/buscar-ventas-anio", ventas.countByYears);

    // Search Data by year 
    router.post("/buscar-ventas-trimestre", ventas.countBythreeMonth);

    // Search Data by year 
    router.post("/buscar-ventas-semestre", ventas.countBySixMonth);

    // Create a new VentaContador
    router.post("/guardar-venta-contador", ventas.createVentaContador);

    // Create a new VentaContador
    router.post("/guardar-monto-venta-contador", ventas.createMontoVentaContador);

    // Search montos totales por año y mes 
    router.post("/buscar-montos-ventas", ventas.countSalesMountByMonths);
  
    app.use("/api/ventas", router);
};