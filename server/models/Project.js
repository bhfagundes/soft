const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  }
});

module.exports = Project = mongoose.model("projects", ProjectSchema);
