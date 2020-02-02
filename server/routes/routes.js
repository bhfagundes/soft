const express = require("express");

const UserController = require("../controllers/user");
const CategorieController = require("../controllers/categorie");
const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/users", UserController.getUsers);
router.post("/categorie/create", CategorieController.createCategorie);
router.get("/categories", CategorieController.getCategories);
module.exports = router;
