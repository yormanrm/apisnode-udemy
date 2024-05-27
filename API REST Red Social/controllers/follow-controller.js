const Response = require("../classes/response-class")

const test = (req, res) => {
    return res.status(200).json(
        new Response(200, "OK", null)
    );
}

module.exports = {
    test
}