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

  const getById = (req, res) => {
    const { id } = req.params;
    const user = app.db.User.findAll({
      attributes: ["id", "userName", "userEmail", "userType"],
      where: { id }
    })
      .then(user => res.status(200).send(user))
      .catch(err => res.status(500).json({ message: err }));
  };

  const save = async (req, res) => {
    const user = { ...req.body };
    if (req.params.id) user.id = req.params.id;

    try {
      existsOrError(user.userName, "Nome não informado");
      existsOrError(user.userEmail, "E-mail não informado");
      existsOrError(user.password, "Senha não informada");
      existsOrError(user.confirmPassword, "Confirmação de senha não informada");
      equalsOrError(user.password, user.confirmPassword, "Senhas não conferem");

      const userFromDB = await app.db.User.findOne({
        where: { userEmail: user.userEmail }
      });

      if (!user.id) {
        notExistsOrError(userFromDB, "Usuário já cadastrado");
      }
    } catch (err) {
      return res.status(400).json({ message: err });
    }

    try {
      if (!user.id) {
        await app.db.User.create({
          userName: user.userName,
          userEmail: user.userEmail,
          password: user.password
        });
        return res.status(204).send();
      } else {
        await app.db.User.update(
          {
            userName: user.userName,
            userEmail: user.userEmail,
            password: user.password
          },
          { where: { id: user.id }, individualHooks: true }
        );

        return res.status(204).send();
      }
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };

  return { get, save, getById };
};
