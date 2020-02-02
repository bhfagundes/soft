const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CategorieSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = Categorie = mongoose.model("categories", CategorieSchema);
