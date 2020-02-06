const { User } = require("../../app/models");
const { existsOrError, equalsOrError } = require("../../util/validation");

const { errorHandler, returnsData } = require("../../util/respHandler");

class UserController {
  get(req, res) {
    User.findAll({
      attributes: ["id", "userName", "userEmail", "userType"]
    })
      .then(users =>
        res.status(200).send(returnsData("Consulta Realizada!!", users))
      )
      .catch(err => {
        res.status(500).send(errorHandler("Erro interno lista Usuários", err));
      });
  }

  getById(req, res) {
    const { id } = req.params;
    User.findAll({
      attributes: ["id", "userName", "userEmail", "userType"],
      where: { id }
    })
      .then(user =>
        res.status(200).send(returnsData("Consulta Realizada!!", user))
      )
      .catch(err =>
        res.status(500).send(errorHandler("Usuário não encontrado...", err))
      );
  }

  async save(req, res) {
    const user = { ...req.body };
    try {
      existsOrError(user.userEmail, "E-mail não informado");
      existsOrError(user.userName, "Nome não informado");
      existsOrError(user.password, "Senha não informada");
      equalsOrError(user.password, user.confirmPassword, "Senhas não conferem");
    } catch (err) {
      return res.status(400).send(errorHandler(err));
    }

    let userFromDB = await User.findOne({
      where: { userEmail: user.userEmail }
    });

    if (userFromDB) {
      return res.status(500).send(errorHandler("Usuário já cadastrado"));
    }

    const userNewDB = await User.create({
      userName: user.userName,
      userEmail: user.userEmail,
      password: user.password
    });

    User.findAll({
      attributes: ["id", "userName", "userEmail", "userType"],
      where: { id: userNewDB.id }
    })
      .then(user => {
        res.send(returnsData("Usuário incuido com sucesso!", user));
      })
      .catch(err => res.status(500).send(errorHandler(err)));
  }

  async update(req, res) {
    const user = { ...req.body };
    if (req.params.id) user.id = req.params.id;
    try {
      const userFromDB = await User.findOne({
        where: { id: user.id }
      });

      if (!userFromDB) {
        return res.status(500).send(errorHandler("Usuário não cadastrado"));
      }
      equalsOrError(
        user.userEmail,
        userFromDB.userEmail,
        "Email não confere.."
      );

      equalsOrError(user.password, user.confirmPassword, "Senhas não conferem");

      if (typeof user.password !== "undefined" && user.password !== "") {
        existsOrError(
          user.confirmPassword,
          "Confirmação de senha não informada"
        );
      } else {
        delete user.password;
        delete user.confirmPassword;
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send(errorHandler(err));
    }

    try {
      await User.update(user, {
        where: { id: user.id },
        individualHooks: true
      });

      User.findAll({
        attributes: ["id", "userName", "userEmail", "userType"],
        where: { id: user.id }
      })
        .then(user => res.send(returnsData("Usuário Atualizado!!", user)))
        .catch(err => res.status(500).send(errorHandler(err)));
    } catch (err) {
      return res.status(500).json(errorHandler(err));
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const userFromDB = await User.destroy({
        where: { id }
      });
      existsOrError(userFromDB, "Usuário Não encontrado!");

      return res.status(200).send(returnsData("Usuário excluido!!", null));
    } catch (err) {
      return res.status(400).send(errorHandler(err));
    }
  }
}
module.exports = new UserController();
