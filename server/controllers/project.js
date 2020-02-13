const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
const Project = require("../models/Project");

passport.authenticate("jwt", { session: false }),
  (getProjects = async (req, res) => {
    let projectsArr = [];
    // Member projects
    await Project.find({})
      .then(projects => {
        if (projects.length > 0) {
          projects.map(project => {
            projectsArr.push(project);
          });
          res.json(projectsArr);
        } else {
          return res.status(500).json({
            success: false,
            error: "Nenhum projeto cadastrado!"
          });
        }
      })
      .catch(err => console.log(err));
  });
passport.authenticate("jwt", { session: false }),
  (getProject = async (req, res) => {
    let id = req.params.id;
    Project.findById(id).then(project => res.json(project));
  });
passport.authenticate("jwt", { session: false }),
  (createProject = async (req, res) => {
    const NEW_PROJECT = new Project({
      name: req.body.projectName,
      department: req.body.department,
      status: req.body.status
    });
    NEW_PROJECT.save()
      .then(project => res.json(project))
      .catch(err => console.log(err));
  });

passport.authenticate("jwt", { session: false }),
  (updateProject = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    let projectFields = {};
    projectFields.name = req.body.projectName;
    projectFields.status = req.body.status;
    projectFields.department = req.body.department;
    Project.findOneAndUpdate(
      { _id: req.body.id },
      { $set: projectFields },
      { new: true }
    )
      .then(project => {
        res.json(project);
      })
      .catch(err => console.log(err));
  });

passport.authenticate("jwt", { session: false }),
  (deleteProject = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    Project.findById(req.params.id).then(project => {
      project.remove().then(() => res.json({ success: true }));
    });
  });

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
};
