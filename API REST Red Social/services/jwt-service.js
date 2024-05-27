const jwt = require("jwt-simple");
const moment = require("moment");
const PayloadJWT = require("../classes/payload-jwt-class")

const secret = "C14V3_S3CR3T4_2X24"; // Clave secreta personalizada para generar tokens, esta se usa para codificar y decodificar un token, asi evitamos que terceros puedan decodificarlos
const exp_time = 10;
const exp_unit = "minutes";

const create = (user) => {
    const payload = new PayloadJWT(user._id, user.role, moment().unix(), moment().add(exp_time, exp_unit).unix());
    return jwt.encode(payload, secret); // devolvemos el jwt ya codificado
}

const clean = (req) => {
    return req.headers.authorization.replace(/['"]+/g, '');
}

const decode = (token) => {
    return new Promise((resolve, reject) => {
        try {
            const jwtdecode = jwt.decode(token, secret);
            resolve(jwtdecode);
        } catch (error) {
            reject(error)
        }
    });
}

const getUserId = async (req) => {
    const token = clean(req);
    const payload = await decode(token);
    return payload.id;
}

const getUserRole = async (req) => {
    const token = clean(req);
    const payload = await decode(token);
    return payload.role;
}

module.exports = {
    secret,
    create,
    clean,
    decode,
    getUserId,
    getUserRole
}