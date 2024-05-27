const Article = require("../models/article-model");
const { validParams } = require("../handlers/valid-article-handler")
const fs = require("fs");

const createArticle = (req, res) => {
    // Recolectar los datos a guardar dentro de req
    let params = req.body;
    let image = req.file;
    // Validamos datos usando la clase handler de articulos
    try {
        validParams(params);
    } catch (error) {
        return res.status(400).json({
            code: 400,
            status: "ERROR",
            msg: "Invalid params"
        });
    }
    // Si image viene con un file entonces...
    if (image) {
        // Recogemos el nombre completo del archivo
        const fileName = image.originalname;
        // Separamos el nombre de la extension
        const fileName_split = fileName.split("\.");
        // Recogemos la extension del archivo
        const extension = fileName_split[1];
        // Comprobamos que sea una extension valida
        if (extension != "PNG" && extension != "png" && extension != "jpg" && extension != "jpeg" && extension != "JPG" && extension != "JPEG") {
            fs.unlink(image.path, (error) => {
                return res.status(400).json({
                    code: 400,
                    status: "ERROR",
                    msg: "Invalid file extension"
                });
            });
        } else {
            // Si es una extension valida, asignamos el nombre del archivo
            params.image = image.filename
        }
    } else {
        // Si image viene vacio, asignamos el nombre del archivo por defecto
        params.image = "default.png";
    }
    // Creamos un objeto mongoose que contiene la informacion del articulo a guardar
    const article_mongoose = new Article(params);
    // Guardamos el articulo nuevo
    article_mongoose.save((error, saved_article) => {
        if (error || !saved_article) {
            // Devolvemos un response con el error
            return res.status(400).json({
                code: 400,
                status: "ERROR",
                msg: "Article not saved, try again"
            });
        } else {
            // Devolver un response con el articulo que se guardo
            return res.status(201).json({
                code: 201,
                status: "CREATED",
                article: saved_article
            })
        }
    });
}

const getArticles = (req, res) => {
    const query = Article.find({})
        // .limit(2) // limita la cantidad de registros en nuestra consulta
        .sort({ date: -1 }) // Ordena por fecha de manera descendente
        .exec(
            (error, articles) => {
                if (error || !articles) {
                    return res.status(404).json({
                        code: 404,
                        status: "NOT FOUND ERROR",
                        msg: "No articles finded"
                    });
                } else {
                    return res.status(200).json({
                        code: 200,
                        status: "OK",
                        articles: articles
                    })
                }
            }
        );
}

const getArticle = (req, res) => {
    // Recoger un id por la URL
    const id = req.params.id;
    // Buscar el articulo
    Article.findById(id, (error, article) => {
        if (error || !article) {
            return res.status(404).json({
                code: 404,
                status: "NOT FOUND ERROR",
                msg: "No article finded"
            });
        } else {
            return res.status(200).json({
                code: 200,
                status: "OK",
                article: article
            });
        }
    });
}

const deleteArticle = (req, res) => {
    const id = req.params.id;

    Article.findOneAndDelete({ _id: id }, (error, articleDeleted) => {
        if (error || !articleDeleted) {
            return res.status(404).json({
                code: 404,
                status: "NOT FOUND ERROR",
                msg: "No article deleted"
            });
        } else {

            if (articleDeleted.image != "default.png") {
                const path = "images/" + articleDeleted.image;
                fs.unlink(path, (error) => {
                    if (error) {
                        return res.status(400).json({
                            code: 400,
                            status: "ERROR",
                            msg: "Invalid path"
                        });
                    }
                });
            }

            return res.status(200).json({
                code: 200,
                status: "OK"
            });
        }
    });
}

const editArticle = (req, res) => {
    const id = req.params.id;
    const params = req.body;
    try {
        validParams(params);
    } catch (error) {
        return res.status(400).json({
            code: 400,
            status: "ERROR",
            msg: "Invalid params"
        });
    }
    Article.findOneAndUpdate({ _id: id }, params, { new: true }, (error, articleUpdated) => {
        if (error || !articleUpdated) {
            return res.status(404).json({
                code: 404,
                status: "NOT FOUND ERROR",
                msg: "No article updated"
            });
        } else {
            return res.status(200).json({
                code: 200,
                status: "OK",
                article: articleUpdated
            });
        }
    });
}

const changeImage = (req, res) => {
    let file = req.file;
    let id = req.params.id;

    if (req.file) {
        // Recoger nombre del archivo
        const fileName = file.originalname;
        // Recoger la extension
        const fileName_split = fileName.split("\.");
        const extension = fileName_split[1];
        // Validar extension
        if (extension != "PNG" && extension != "png" && extension != "jpg" && extension != "jpeg" && extension != "JPG" && extension != "JPEG") {
            fs.unlink(req.file.path, (error) => {
                return res.status(400).json({
                    code: 400,
                    status: "ERROR",
                    msg: "Invalid file type"
                });
            });
        } else {
            Article.findById(id, (error, article) => {
                if (error || !article) {
                    return res.status(404).json({
                        code: 404,
                        status: "NOT FOUND ERROR",
                        msg: "No article finded"
                    });
                } else {
                    if (article.image != "default.png") {
                        const path = "images/" + article.image;
                        fs.unlink(path, (error) => {
                            if (error) {
                                return res.status(400).json({
                                    code: 400,
                                    status: "ERROR",
                                    msg: "Invalid path"
                                });
                            }
                        });
                    }
                    Article.findOneAndUpdate({ _id: article.id }, { image: file.filename }, { new: true }, (error, articleUpdated) => {
                        if (error || !articleUpdated) {
                            return res.status(404).json({
                                code: 400,
                                status: "ERROR",
                                msg: "No image uploaded"
                            });
                        } else {
                            return res.status(200).json({
                                code: 200,
                                status: "OK",
                                article: articleUpdated
                            });
                        }
                    });
                }
            });
        }
    }
}

const searchArticles = (req, res) => {
    const search_txt = req.params.searchtxt;
    Article.find({
        "$or": [
            { "title": { "$regex": search_txt, "$options": "i" } },
            { "content": { "$regex": search_txt, "$options": "i" } }
        ]
    })
        .sort({ date: -1 })
        .exec((error, articlesMatched) => {
            if (error || !articlesMatched || articlesMatched.length <= 0) {
                return res.status(404).json({
                    code: 404,
                    status: "NOT FOUND ERROR",
                    msg: "No articles found"
                });
            } else {
                return res.status(200).json({
                    code: 200,
                    status: "OK",
                    articles: articlesMatched
                });
            }
        });
}


module.exports = {
    createArticle,
    getArticles,
    getArticle,
    deleteArticle,
    editArticle,
    changeImage,
    searchArticles
}