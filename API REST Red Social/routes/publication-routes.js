const express = require("express");
const router = express.Router();
const controller = require("../controllers/publication-controller");

router.get("/test", controller.test);

module.exports = router