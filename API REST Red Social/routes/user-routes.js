const express = require("express");
const router = express.Router();
const controller = require("../controllers/user-controller");
const authMiddleware = require("../middleware/auth-middleware");

router.get("/test", authMiddleware.auth, controller.test);
router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/profile-data", authMiddleware.auth, controller.profile_data);
router.get("/list", authMiddleware.auth, controller.users_list);
router.put("/update/profiledata", authMiddleware.auth, controller.update_profiledata);
router.put("/update/email", authMiddleware.auth, controller.update_email);
router.put("/update/password", authMiddleware.auth, controller.update_password);

module.exports = router