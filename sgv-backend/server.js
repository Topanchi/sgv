const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use((req,res,next)=>{
    res.header('Content-Type: application/json');
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});


// models
const db = require("./app/models");
const User = db.user;
const Role = db.role;
const Categorias = db.categoria;
const Productos = db.producto;
const Ventas = db.venta;

// DB connection
db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("*** Conexión exitosa a MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
});


// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to SGV application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/categoria.routes")(app);
require("./app/routes/producto.routes")(app);
require("./app/routes/venta.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`*** Servidor corriendo en el puerto ${PORT}.`);
});

function initial() {

    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                console.log("error", err);
                }
        
                console.log("added 'user' to roles collection");
            });
        
            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                console.log("error", err);
                }
        
                console.log("added 'moderator' to roles collection");
            });
        
            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                console.log("error", err);
                }
        
                console.log("added 'admin' to roles collection");
            });
        }
    });


    (async () => {
        const res = await Role.countDocuments();
        const userRes = await User.countDocuments();
        const categoriasRes = await Categorias.countDocuments();
        const productosRes = await Productos.countDocuments();
        const ventasRes = await Ventas.countDocuments();
        console.log("*** Roles ingresados:::::::", res );
        console.log("*** Usuarios registrados:::", userRes );
        console.log("*** Categorias registrados:", categoriasRes );
        console.log("*** Prodcutos registrados::", productosRes );
        console.log("*** Ventas registrados:::::", ventasRes );
    })();
}
