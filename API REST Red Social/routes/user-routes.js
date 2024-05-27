const express = require("express");
const router = express.Router();
const controller = require("../controllers/user-controller");
// Middlewares
const auth = require("../middleware/auth-middleware");
const exist_email = require("../middleware/exist-email-middleware");

router.get("/test", auth.middleware, controller.test);
router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/profile-data", auth.middleware, controller.profile_data);
router.get("/list", auth.middleware, controller.users_list);
router.put("/update/profiledata", auth.middleware, controller.update_profiledata);
router.put("/update/email", auth.middleware, exist_email.middleware, controller.update_email);
router.put("/update/password", auth.middleware, controller.update_password);

module.exports = router