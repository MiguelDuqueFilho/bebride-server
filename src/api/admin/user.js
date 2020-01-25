const { User } = require("../../app/models");
const validation = require("../../util/validation");

class UserController {
  get(req, res) {
    User.findAll({
      attributes: ["id", "userName", "userEmail", "userType"]
    })
      .then(users => res.status(200).send(users))
      .catch(err => res.status(500).json({ message: err }));
  }

  getById(req, res) {
    const { id } = req.params;
    const user = User.findAll({
      attributes: ["id", "userName", "userEmail", "userType"],
      where: { id }
    })
      .then(user => res.status(200).send(user))
      .catch(err => res.status(500).json({ message: err }));
  }

  async save(req, res) {
    const user = { ...req.body };
    try {
      validation.existsOrError(user.userEmail, "E-mail não informado");
      validation.existsOrError(user.userName, "Nome não informado");
      validation.existsOrError(user.password, "Senha não informada");
      validation.existsOrError(
        user.confirmPassword,
        "Confirmação de senha não informada"
      );
      validation.equalsOrError(
        user.password,
        user.confirmPassword,
        "Senhas não conferem"
      );
      const userFromDB = await User.findOne({
        where: { userEmail: user.userEmail }
      });

      validation.notExistsOrError(userFromDB, "Usuário já cadastrado");
    } catch (err) {
      return res.status(400).json({ message: err });
    }

    try {
      await User.create({
        userName: user.userName,
        userEmail: user.userEmail,
        password: user.password
      });
      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }

  async update(req, res) {
    const user = { ...req.body };
    if (req.params.id) user.id = req.params.id;
    try {
      const userFromDB = await User.findOne({
        where: { id: user.id }
      });

      validation.existsOrError(userFromDB, "Usuário não cadastrado");
      console.log(typeof user.password);
      if (typeof user.password !== "undefined" && user.password !== "") {
        validation.existsOrError(
          user.confirmPassword,
          "Confirmação de senha não informada"
        );
        validation.equalsOrError(
          user.password,
          user.confirmPassword,
          "Senhas não conferem"
        );
      } else {
        delete user.password;
        delete user.confirmPassword;
      }
    } catch (err) {
      return res.status(400).json({ message: err });
    }

    try {
      await User.update(user, {
        where: { id: user.id },
        individualHooks: true
      });

      return res.status(204).json({ user });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const userFromDB = await User.destroy({
        where: { id }
      });
      validation.existsOrError(userFromDB, "Usuário Não encontrado!");

      return res.status(200).json({ message: "User deleted!" });
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }
}
module.exports = new UserController();
