// const Errors = require("../util/errors");

module.exports = app => {
  const bcrypt = require("bcryptjs");
  const {
    existsOrError,
    notExistsOrError,
    equalsOrError
  } = app.src.util.validation;
  // const { checkError } = app.src.util.errors;

  const get = (req, res) => {
    app.db.User.findAll({
      attributes: ["id", "userName", "userEmail", "userType"]
    })
      .then(users => res.status(200).send(users))
      .catch(err => res.status(500).json({ message: err }));
  };

  const save = async (req, res) => {
    const { id, userName, userEmail, password, confirmPassword } = req.body;

    try {
      existsOrError(userName, "Nome não informado");
      existsOrError(userEmail, "E-mail não informado");
      existsOrError(password, "Senha não informada");
      existsOrError(confirmPassword, "Confirmação de senha não informada");
      equalsOrError(password, confirmPassword, "Senhas não conferem");

      const userFromDB = await app.db.User.findOne({
        where: { userEmail }
      });

      notExistsOrError(userFromDB, "Usuário já cadastrado");

      const passwordHash = await bcrypt.hash(password, 8);

      const user = await app.db.User.create({
        userName,
        userEmail,
        passwordHash
      });

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  };

  return { get, save };
};
