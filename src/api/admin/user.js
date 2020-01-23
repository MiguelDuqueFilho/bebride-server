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
    if (req.params.id) user.id = req.params.id;

    try {
      validation.existsOrError(user.userEmail, "E-mail não informado");

      const userFromDB = await User.findOne({
        where: { userEmail: user.userEmail }
      });

      if (!user.id) {
        validation.notExistsOrError(userFromDB, "Usuário já cadastrado");
      } else {
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
      }
    } catch (err) {
      return res.status(400).json({ message: err });
    }

    try {
      if (!user.id) {
        await User.create({
          userName: user.userName,
          userEmail: user.userEmail,
          password: user.password
        });
        return res.status(204).send();
      } else {
        await User.update(
          {
            userName: user.userName,
            password: user.password,
            userType: user.userType
          },
          { where: { id: user.id }, individualHooks: true }
        );

        return res.status(204).send();
      }
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }
}

module.exports = new UserController();
