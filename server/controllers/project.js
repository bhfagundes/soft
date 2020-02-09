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
            error: "Nenhum projeto com este id cadastrado!"
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
    if (!req.body.members) {
      err = "Nenhum usuário definido";
      return res.status(400).json({ success: false, error: err });
    }
    let owner = req.body.members[0];
    await User.find({ email: owner.email })
      .then(user => {
        if (!user) {
          err = "Owner não encontrado";
          return res.status(400).json({ success: false, error: err });
        }
        const OWNER = {
          id: user.id,
          name: user.name,
          email: user.email
        };
        const NEW_PROJECT = new Project({
          owner: OWNER,
          name: req.body.projectName,
          teamMembers: req.body.members
        });
        NEW_PROJECT.save()
          .then(project => res.json(project))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });

module.exports = {
  getProjects,
  getProject,
  createProject
};
