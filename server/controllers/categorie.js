const passport = require("passport");
const Categorie = require("../models/Categorie");

getCategories = async (req, res) => {
  await Categorie.find({}, (err, categories) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!categories.length) {
      return res
        .status(404)
        .json({ success: false, error: "Nenhuma categoria cadastrada!" });
    }
    return res.status(200).json({ success: true, data: categories });
  }).catch(err => console.log(err));
};

getCategorie = async (req, res) => {
  passport.authenticate("jwt", { session: false }),
    (req, res) => {
      let id = req.params.id;

      Categorie.findById(id).then(categorie => res.json(categorie));
    };
};

createCategorie = (req, res) => {
  //validando se usuário está logado
  passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const newCategorie = new Categorie({
        name: req.body.name
      });
      newCategorie
        .save()
        .then(categorie => res.json(categorie))
        .catch(err => console.log(err));
    };
};

module.exports = {
  createCategorie,
  getCategorie,
  getCategories
};
