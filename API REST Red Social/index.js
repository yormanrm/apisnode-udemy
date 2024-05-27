const connection = require("./database/connection"); // importamos nuestra conexion a la base de datos
const express = require("express"); // importamos express para crear un servidor de node
const cors = require("cors"); // importamos corss para permitir peticiones de clientes externos

connection(); // establecemos una conexion a la base de datos

const app = express(); // objeto para crear el servidor de express que escuchara las peticiones
const port = 3900; // puerto de nuestro servidor

app.use(cors()); // middleware para configurar el cors y permitir peticiones de clientes externos
app.use(express.json()); // middleware para decodificar los body request a formato json
app.use(express.urlencoded({extended:true})); // middleware para permitir el ingreso de datos mediante form-urlencoded

const user_routes = require("./routes/user-routes"); // importamos el enrutador del controlador de usuarios
const follow_routes = require("./routes/follow-routes"); // importamos el enrutador del controlador del sistema de followers
const publication_routes = require("./routes/publication-routes"); // importamos el enrutador del controlador de publicaciones
app.use("/api/users", user_routes); // exponemos las rutas del controlador de usuarios
app.use("/api/followers", follow_routes); // exponemos las rutas del controlador del sistema de followers
app.use("/api/publications", publication_routes); // exponemos las rutas del controlador de publicaciones

app.listen(port, () => {
    console.log("Server initialized on port: " + port);
}); // Arrancamos el servidor para que escuche todas las peticiones http