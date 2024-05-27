const Response = require("../classes/response-class");
const User = require("../models/user-model");

exports.middleware = async (req, res, next) => {
    User.findOne({ email: req.body.email }, (error, email_found) => {
        if (error) {
            return res.status(500).json(
                new Response(500, "An error occurred while executing the query, try again", null)
            );
        } if (email_found) {
            return res.status(400).json(
                new Response(400, "There is already a registered user with this email", null)
            );
        } else {
            next();
        }
    });
}