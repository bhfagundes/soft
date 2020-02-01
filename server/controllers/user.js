const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Validação dos inputs
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Carregando Model
const User = require("../models/User");

register = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Iniciando validação
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "E-mail já existe!" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Transformando password em hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
};
login = (req, res) => {
  // Iniciando validação
  const { errors, isValid } = validateLoginInput(req.body);

  // Validando se possui erros de input
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Buscando usuário por email
  User.findOne({ email }).then(user => {
    // Verificando se usuário existe
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email não encontrado" });
    }

    // Validando password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ passwordincorrect: "Senha incorreta" });
      }
    });
  });
};
getUsers = async (req, res) => {
  await User.find({}, (err, users) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!users.length) {
      return res
        .status(404)
        .json({ success: false, error: "Nenhum usuário cadastrado!" });
    }
    return res.status(200).json({ success: true, data: users });
  }).catch(err => console.log(err));
};

module.exports = {
  register,
  login,
  getUsers
};
