const mongoosePaginator = require("mongoose-pagination");
const User = require("../models/user-model");
const bcryptService = require("../services/bcrypt-service");
const jwtService = require("../services/jwt-service");
const UserValidators = require("../validators/user-validators");
const Response = require("../classes/response-class");

const test = (req, res) => {
    return res.status(200).json(
        new Response(200, "OK", null)
    );
}

const register = async (req, res) => { // indicamos que será una función asincrona ya que esperaremos la validacion de si existe o no un usuario con el mismo correo que uno nuevo, para evitar credenciales duplicadas
    let user = req.body;
    try {
        UserValidators.user_params(user); // validamos que todos los parametros necesarios para el registro de un usuario vengan en el request
    } catch (error) {
        return res.status(400).json(
            new Response(400, "User data is missing", null)
        );
    }
    try {
        /*
            Utilizamos await para esperar a que la promesa devuelta por exist_user se resuelva. 
            Esto es necesario porque exist_user realiza una operación asíncrona (una búsqueda en la base de datos) 
            y await asegura que el código siguiente no se ejecute hasta que esta operación haya terminado. 
            Si la promesa se rechaza (es decir, si se encuentra un usuario o hay un error), 
            se lanzará una excepción que será capturada por el bloque catch.
        */
        await UserValidators.exist_user(user.email);
    } catch (error) {
        return res.status(400).json(
            new Response(400, "User already registered", null)
        );
    }
    /* Hacemos uso de la libreria bcrypt para encryptar el password del usuario y asi evitar que este quede registrado "crudo" en la base de datos */
    /* Esto mediante una clase helper con una funcion asincrona que realiza el encriptado y la cual debemos esperar a que termine el encriptado para poder guardar el usuario */
    user.password = await bcryptService.encrypt(user.password);
    const user_mongoose = new User(user);

    user_mongoose.save((error, registered_user) => {
        if (error || !registered_user) {
            return res.status(500).json(
                new Response(500, "Unregistered user, please try again", null)
            );
        } else {
            return res.status(201).json(
                new Response(201, "User registered successfully", registered_user)
            );
        }
    });
}

const login = (req, res) => {
    let params = req.body;
    try {
        UserValidators.login_credentials(params);
    } catch (error) {
        return res.status(400).json(
            new Response(400, "Missing email or password field", null)
        );
    }
    User.findOne({ email: params.email }, (error, successfull_login) => {
        if (error || !successfull_login) {
            return res.status(404).json(
                new Response(404, "User not found or incorrect credentials", null)
            );
        } else {
            if (!bcryptService.compare(params.password, successfull_login.password)) {
                return res.status(404).json(
                    new Response(404, "User not found or incorrect credentials", null)
                );
            } else {
                const token = jwtService.create(successfull_login);
                return res.status(200).json(
                    new Response(200, "Correct user", token)
                )
            }
        }
    });
}

const profile_data = async (req, res) => {
    const id = await jwtService.getUserId(req);
    User.findById(id)
        .select({ _id: 0, __v: 0, password: 0, role: 0, created_at: 0 })
        .exec(
            (error, user_found) => {
                if (error || !user_found) {
                    return res.status(404).json(
                        new Response(404, "Profile data not found", user_found)
                    );
                } else {
                    return res.status(200).json(
                        new Response(200, "Profile data", user_found)
                    );
                }
            }
        );
}

const users_list = (req, res) => {
    let page = 1;
    let itemsPerPage = 5;
    if (req.body.page) {
        page = parseInt(req.body.page);
    }
    if (req.body.itemsPerPage) {
        itemsPerPage = parseInt(req.body.itemsPerPage);
    }
    User.find().sort('_id').paginate(page, itemsPerPage, (error, users, total) => {
        if (error || !users) {
            return res.status(404).json(
                new Response(404, "Users not found", null)
            );
        } else {
            return res.status(200).json(
                new Response(200, "OK", { users, page, pages: Math.ceil(total / itemsPerPage), itemsPerPage, total })
            );
        }
    });

}

const update_profiledata = (req, res) => {
    return res.status(200).json(
        new Response(200, "OK", req.user)
    );
}

const update_password = (req, res) => {
    return res.status(200).json(
        new Response(200, "OK", req.user)
    );
}

const update_email = (req, res) => {
    return res.status(200).json(
        new Response(200, "OK", req.user)
    );
}

module.exports = {
    test,
    register,
    login,
    profile_data,
    users_list,
    update_profiledata,
    update_password,
    update_email
}