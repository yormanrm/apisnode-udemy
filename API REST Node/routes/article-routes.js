const express = require("express");
const router = express.Router();
const controller = require("../controllers/article-controller");
// Gestion de archivos
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images");
    },
    filename: (req, file, cb) => {
        cb(null, "article" + Date.now() + file.originalname);
    }
})
const uploads = multer({ storage: storage })

router.post("/create", [uploads.single("image")], controller.createArticle); // Asignamos el middleware de multer para la gestion de archivos en el endpoint
router.get("/get-articles", controller.getArticles);
router.get("/get-article/:id", controller.getArticle);
router.delete("/delete-article/:id", controller.deleteArticle);
router.put("/edit-article/:id", controller.editArticle);
router.post("/change-image/:id", [uploads.single("image")], controller.changeImage); // Asignamos el middleware de multer para la gestion de archivos en el endpoint
router.get("/search/:searchtxt", controller.searchArticles);

module.exports = router;