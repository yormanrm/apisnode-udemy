const { connection } = require("./database/connection"); // importamos nuestra conexion a la base de datos
const express = require("express"); // importamos express
const cors = require("cors") // importamos cors

connection(); // ejecutamos la conexion a la base de datos
const app = express(); // creamos el servidor de Node y a su vez la app de Express para la ejecucion de diferentes metodos middleware

// Middleware (acciones que se ejecutan antes de la ejecucion de una ruta/endpoint)
app.use(cors()); // middleware para el cors antes de que se ejecute una ruta
app.use(express.json()); // middleware que permite recibir datos con content-type app/json (raw)
app.use(express.urlencoded(extended = true)); // middleware que permite recibir datos con content-type form-urlencoded

// Endpoints hardcodeadas
app.get("/test-response-html", (req, res) => { // endpoint de prueba el cual se compone por un request (entrada de datos) y un response (salida de datos)
    console.log("return html route works!");
    return res.status(200).send(`
        <div>
            <p>Test route works!</p>
        </div>
    `); // send devuelve un response generico para terminos de prueba mas que nada (objetos o html)
});
app.get("/test-response-json", (req, res) => {
    console.log("return json route works!");
    return res.status(200).send(
        [
            {
                name: "Object 1",
                date: new Date()
            },
            {
                name: "Object 2",
                date: new Date()
            },
            {
                name: "Object 5",
                date: new Date()
            },
        ]);
});
// Endpoints Controller
const article_routes = require("./routes/article-routes"); //Rutas del controlador Articles
app.use("/api/articles", article_routes) //Cargamos las rutas bajo el prefijo /api/artcile

app.listen(3900, () => { // ejecutar el servidor para escuchar peticiones HTTP
    console.log("Server init on port 3900");
});