const { User } = require("../../app/models");
const { existsOrError, equalsOrError } = require("../../util/validation");
const { errorHandler, returnsData } = require("../../util/respHandler");
const { authSecret } = require("../../config/config");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const crypto = require("crypto");
const mailer = require("../../app/modules/mailer");

class SessionController {
  async validateToken(req, res) {
    const token = req.body.token || "";
    try {
      const decode = await promisify(jwt.verify)(token, authSecret);
      return res.send(returnsData("Token está valido.."));
    } catch (err) {
      return res.status(401).send(errorHandler("User invalid token"));
    }
  }

  async login(req, res) {
    const { userEmail, password } = req.body;

    try {
      existsOrError(userEmail, "E-mail não informado");
      existsOrError(password, "Senha não informada");

      const user = await User.findOne({ where: { userEmail } });

      existsOrError(user, "Usuário não encontrado!");

      if (!(await user.checkPassword(password))) {
        return res.status(401).send(errorHandler("Email/Senha inválidos!"));
      }

      return res.send(returnsData("Login com sucesso..", user.generateToken()));
    } catch (err) {
      return res.status(401).send(errorHandler(err));
    }
  }

  async signup(req, res) {
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
      .catch(err => {
        res.status(500).send(errorHandler(err));
      });
  }

  async logoff(req, res) {
    return res.status(200).json(
      returnsData("Usuário Logoff", {
        name: req.decode.name,
        email: req.decode.email
      })
    );
  }

  async forgotPassword(req, res) {
    const { userEmail } = req.body;
    try {
      const user = await User.findOne({
        where: { userEmail }
      });

      existsOrError(user, "Usuário não cadastrado");

      const token = crypto.randomBytes(20).toString("hex");

      const now = new Date();

      now.setHours(now.getHours() + 1);

      await User.update(
        {
          passwordResetToken: token,
          passwordResetExpires: now
        },
        {
          where: { id: user.id }
        }
      );

      const info = await mailer.sendMail({
        to: userEmail,
        from: "miguel.duque@globo.com",
        subject: "Esqueci minha senha",
        template: "forgot_password",
        context: { name: user.userName, token }
      });

      return res.send(returnsData("Email enviado...", info));
    } catch (err) {
      return res.status(400).send(errorHandler(err));
    }
  }
  async resetPassword(req, res) {
    const { userEmail, token, password } = req.body;

    try {
      const user = await User.findOne({
        where: { userEmail }
      });

      existsOrError(user, "Usuário não cadastrado");

      if (token !== user.passwordResetToken) {
        return res.status(400).send(errorHandler("token invalido!"));
      }

      const now = Date();
      if (now > user.passwordResetExpires) {
        return res.status(400).send(errorHandler("token expirado!"));
      }

      user.password = password;

      await User.update(
        {
          password,
          passwordResetToken: null,
          passwordResetExpires: null
        },
        { where: { id: user.id }, individualHooks: true }
      );

      return res.status(200).send(returnsData("Senha alterada com sucesso"));
    } catch (err) {
      return res.status(400).send(errorHandler(err));
    }
  }
}

module.exports = new SessionController();
