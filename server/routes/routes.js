const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const CategorieController = require("../controllers/categorie");
const ProjectController = require("../controllers/project");
const TaskController = require("../controllers/task");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/users", UserController.getUsers);
router.post("/categories/create", CategorieController.createCategorie);
router.get("/categories", CategorieController.getCategories);
router.get("/projects", ProjectController.getProjects);
router.get("/projects/:id", ProjectController.getProjects);
router.post("/projects/create", ProjectController.createProject);
router.post("/task/create", TaskController.createTask);
router.get("/tasks/:id", TaskController.getTask);

module.exports = router;
