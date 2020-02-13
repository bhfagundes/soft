const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const ProjectController = require("../controllers/project");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/users", UserController.getUsers);
router.get("/projects", ProjectController.getProjects);
router.get("/projects/:id", ProjectController.getProjects);
router.post("/projects/create", ProjectController.createProject);
router.patch("projects/update", ProjectController.updateProject);
router.delete("projects/delete/:id", ProjectController.deleteProject);
module.exports = router;
