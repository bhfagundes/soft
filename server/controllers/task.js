const passport = require("passport");
const Task = require("../models/Task");

getTasks = async (req, res) => {
  await Task.find({}, (err, tasks) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!tasks.length) {
      return res
        .status(404)
        .json({ success: false, error: "Nenhuma tarefa cadastrada!" });
    }
    return res.status(200).json({ success: true, data: tasks });
  }).catch(err => console.log(err));
};

getTask = async (req, res) => {
  passport.authenticate("jwt", { session: false }),
    (req, res) => {
      let id = req.params.id;

      Task.findById(id).then(task => res.json(task));
    };
};

createTask = (req, res) => {
  const newTask = new Task({
    name: req.body.name,
    description: req.body.description,
    department: req.body.department
  });
  newTask
    .save()
    .then(task => res.json(task))
    .catch(err => console.log(err));
};

module.exports = {
  createTask,
  getTask,
  getTask
};
