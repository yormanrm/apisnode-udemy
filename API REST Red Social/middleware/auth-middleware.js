const Response = require("../classes/response-class");
const jwtService = require("../services/jwt-service");

exports.middleware = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json(
            new Response(403, "The user does not have the necessary permissions to execute this action", null)
        );
    } else {
        let token = jwtService.clean(req);
        try {
            const payload = await jwtService.decode(token);
            req.user = payload;
            next();
        } catch (error) {
            return res.status(403).json(
                new Response(403, error.message, null)
            );
        }
    }
}