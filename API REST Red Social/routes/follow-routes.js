const express = require("express");
const router = express.Router();
const controller = require("../controllers/follow-controller");

router.get("/test", controller.test);

module.exports = router