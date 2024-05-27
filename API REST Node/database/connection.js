const mongoose = require("mongoose"); // importar mongoose con la palabra reservada require desde node_modules

const connection = async() => { // por si la conexion tarda en realizarse usamos una funcion asincrona y envolvemos todo dentro de un try/catch para manejar mejor la conexion
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect("mongodb://localhost:27018/api_blog"); // Usamos un await por si la conexion tarda y asi indicar que espere a que esta conexion se realice
        /* Parametros Opcionales:
        useNewUrlParser: true
        useUnifiedTopology: true
        useCreateIndex: true */
        console.log("Connection created");
    } catch (error) {
        console.log(error);
        throw new Error("Unable to connect");
    }
}

module.exports = { // exportamosla funcion connection como un module de node_modules para ser usado despues
    connection
}