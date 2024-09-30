const db = require("../models");

const FacturaEvento = db.facturaevento;
const CotizacionEvento = db.cotizacionevento;
const OCEvento = db.ocevento;


// Create and Save a new FacturaEvento
exports.createFacturaEvento = async (req, res) => {

    try {
        // Validate request
        if (!req.body) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
        }

        console.log(req.body)
        const newFactura = new FacturaEvento({
            nombre_doc : req.body.nombre_doc,
            tipo_doc : req.body.tipo_doc,
            tamanio_doc : req.body.tamanio_doc,
            file: req.file,
        });

        const savedFactura = await newFactura.save();

        res.json({ fileId: savedFactura._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al cargar el archivo PDF.' });
    }
}

// Create and Save a new CotizacionEvento
exports.createCotizacionEvento = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const { nombre_doc, tipo_doc, tamanio_doc } = req.file;

    const newCotizacionEvento = new CotizacionEvento({
        nombre_doc,
        tipo_doc,
        tamanio_doc,
        file: req.file.buffer,
    });

    const savedCotizacionEvento = await newCotizacionEvento.save();

    res.json({ fileId: savedCotizacionEvento._id });

}

// Create and Save a new OCEvento
exports.createOCEvento = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const { nombre_doc, tipo_doc, tamanio_doc } = req.file;

    const newOCEvento = new OCEvento({
        nombre_doc,
        tipo_doc,
        tamanio_doc,
        file: req.file.buffer,
    });

    const savedOCEvento = await newOCEvento.save();

  res.json({ fileId: savedOCEvento._id });

}