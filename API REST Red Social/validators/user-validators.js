const validator = require("validator");
const User = require("../models/user-model");

const user_params = (params) => { // validator para verificar que ningun campo esta vacio unicamente
    const valid_name = !validator.isEmpty(params.name);
    const valid_surname = !validator.isEmpty(params.surname);
    const valid_nick = !validator.isEmpty(params.nick);
    const valid_email = !validator.isEmpty(params.email);
    const valid_password = !validator.isEmpty(params.password);
    if (!valid_name || !valid_surname || !valid_nick || !valid_email || !valid_password) {
        throw new Error();
    }
}

// Este validator verifica si ya existe un usuario registrado con el correo electrónico proporcionado.
// Devuelve una promesa que se resuelve si no se encuentra ningún usuario, y se rechaza si se encuentra un usuario o si hay un error.
const exist_user = (email) => {
    /* 
        La función devuelve una nueva promesa. 
        Una promesa es un objeto en JavaScript que representa la eventual 
        finalización (o falla) de una operación asíncrona y su resultado.
    */
    return new Promise((resolve, reject) => {
        // Utiliza el modelo de Mongoose 'User' para buscar un documento cuyo campo 'email' coincida con el correo electrónico proporcionado
        User.findOne({ email: email }, (error, user_found) => {
            // Si ocurre un error durante la búsqueda, la promesa se rechaza con el error
            if (error) {
                return reject(error);
            }
            // Si se encuentra un usuario con el correo electrónico proporcionado, la promesa se rechaza con un nuevo error indicando que el usuario ya existe
            if (user_found) {
                return reject(new Error("User already exists"));
            }
            // Si no hay errores y no se encuentra un usuario, la promesa se resuelve indicando que no existe un usuario con ese correo electrónico
            resolve();
        });
    });
};

const login_credentials = (params) => {
    const valid_email = !validator.isEmpty(params.email);
    const valid_password = !validator.isEmpty(params.password);
    if (!valid_email || !valid_password) {
        throw new Error();
    }
}

module.exports = {
    user_params,
    exist_user,
    login_credentials
}