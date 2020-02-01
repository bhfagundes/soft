const express = require("express");

const UserController = require("../controllers/user");

const router = express.Router();

router.post("/movie", UserController.createMovie);
router.put("/movie/:id", UserController.updateMovie);
router.delete("/movie/:id", UserController.deleteMovie);
router.get("/movie/:id", UserController.getMovieById);
router.get("/movies", UserController.getMovies);
