const { User } = require("../../app/models");
const { existsOrError, equalsOrError } = require("../../util/validation");
const { errorHandler, returnsData } = require("../../util/respHandler");
const { authSecret, frontUrl, email } = require("../../config/config");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const mailer = require("../../app/modules/mailer");

class SessionController {
  async validateToken(req, res) {
    const token = req.body.token || "";
    try {
      const decode = await promisify(jwt.verify)(token, authSecret);
      return res.send(returnsData("Token está valido.."));
    } catch (err) {
      return res.status(401).send(errorHandler("Usuário token invalido."));
    }
  }

  async login(req, res) {
    const { userEmail, password } = req.body;

    try {
      existsOrError(userEmail, "E-mail não informado");
      existsOrError(password, "Senha não informada");

      const user = await User.findOne({ where: { userEmail } });
      console.log(user);
      existsOrError(user, "Usuário ou Senha inválido!!");
      console.log("vai ver password");
      if (!(await user.checkPassword(password))) {
        return res.status(401).send(errorHandler("Email ou Senha inválido!"));
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
      where: { userEmail: user.userEmail },
    });

    if (userFromDB) {
      return res.status(500).send(errorHandler("Usuário já cadastrado"));
    }

    const userNewDB = await User.create({
      userName: user.userName,
      userEmail: user.userEmail,
      password: user.password,
    });

    User.findAll({
      attributes: ["id", "userName", "userEmail", "userType"],
      where: { id: userNewDB.id },
    })
      .then((user) => {
        res.send(returnsData("Usuário incuido com sucesso!", user));
      })
      .catch((err) => {
        res.status(500).send(errorHandler(err));
      });
  }

  async logoff(req, res) {
    return res.status(200).json(
      returnsData("Usuário Logoff", {
        name: req.decode.name,
        email: req.decode.email,
      })
    );
  }

  async forgotPassword(req, res) {
    const { userEmail } = req.body;
    try {
      const user = await User.findOne({
        where: { userEmail },
      });

      existsOrError(user, "Usuário não cadastrado");

      const token = user.generateResetToken();

      await User.update(
        {
          passwordResetToken: token,
        },
        {
          where: { id: user.id },
        }
      );

      const resetPasswordUrl = `${frontUrl}/recovery_password/${token}`;

      const info = await mailer.sendMail({
        to: userEmail,
        from: email.user,
        subject: "Esqueci minha senha",
        template: "forgot_password",
        context: { name: user.userName, link: resetPasswordUrl },
      });

      return res.send(returnsData("Email enviado...", info));
    } catch (err) {
      return res.status(400).send(errorHandler(err));
    }
  }

  async resetPassword(req, res) {
    const { token, password, confirmPassword } = req.body;
    try {
      const user = await User.findOne({
        where: { passwordResetToken: token },
      });
      existsOrError(user, "Token invalido.");
      const secret = user.passwordHash + "-" + user.createdAt;

      const decode = await promisify(jwt.verify)(token, secret);

      if (password !== confirmPassword) {
        return res.status(400).send(errorHandler("Password não coferem!!!"));
      }

      user.password = password;

      await User.update(
        {
          password,
          passwordResetToken: null,
          remoteResetIp: req.connection.remoteAddress,
        },
        { where: { id: user.id }, individualHooks: true }
      );

      return res.status(200).send(returnsData("Senha alterada com sucesso"));
    } catch (err) {
      return res.status(400).send(errorHandler(err));
    }
  }

  async changePassword(req, res) {
    const { id, password, confirmPassword } = req.body;
    try {
      const user = await User.findOne({
        where: { id },
      });

      if (password !== confirmPassword) {
        return res.status(400).send(errorHandler("Password não coferem!!!"));
      }

      user.password = password;

      await User.update(
        {
          password,
        },
        { where: { id }, individualHooks: true }
      );

      return res.status(200).send(returnsData("Senha alterada com sucesso"));
    } catch (err) {
      return res.status(400).send(errorHandler(err));
    }
  }

  async sendEmail(req, res) {
    const { userName, userEmail, messageEmail } = req.body;
    const info = await mailer.sendMail({
      to: email.user,
      from: userEmail,
      subject: "Dúvidas e Sugestões",
      template: "doubts",
      context: { userName, userEmail, messageEmail },
    });

    return res.send(returnsData("Email enviado...", info));
  }
}

module.exports = new SessionController();
