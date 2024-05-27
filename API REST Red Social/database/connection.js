const mongoose = require("mongoose"); // importamos mongoose para la conexion a la base de datos

const connection = async() => { // creamos una funcion asincrona, ya que la conexion podria tardar en establecerse
    try { // envolvemos nuestra conexion en un bloque try/catch ya que es sensible a errores
        mongoose.set('strictQuery', true);
        await mongoose.connect("mongodb://localhost:27018/api_socialnetwork"); // le decimos a mongoose el string de conexion de manera asincrona por si llegara a tardarse la conexion
        console.log("Connection created"); // avisamos que la conexion ha sido establecida
    } catch (error) {
        console.log("Connection failed"); // avisamos que la conexion no ha sido establecida 
        throw new Error(error); // avisamos del error ocurrido
    }
}

module.exports = connection // exportamos nuestra conexion