const { User } = require("../../app/models");
const { existsOrError } = require("../../util/validation");
const { returnsHandler } = require("../../util/errorHandler");
const crypto = require("crypto");
const mailer = require("../../app/modules/mailer");

class SessionController {
  async login(req, res) {
    try {
      const { userEmail, password } = req.body;

      existsOrError(userEmail, "E-mail não informado");
      existsOrError(password, "Senha não informada");

      const user = await User.findOne({ where: { userEmail } });

      existsOrError(user, "Usuário não encontrado!");

      if (!(await user.checkPassword(password))) {
        return res
          .status(401)
          .send(returnsHandler(false, "Email/Senha inválidos!"));
      }

      return res.json(user.generateToken());
    } catch (err) {
      return res.status(401).send(returnsHandler(false, err));
    }
  }
  async logoff(req, res) {
    return res.status(200).json(
      returnsHandler(true, "Usuário Logoff", {
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

      return res.send(info);
    } catch (err) {
      return res
        .status(400)
        .send(returnsHandler(false, "Erro enviando e-mail", err));
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
        return res.status(400).send(returnsHandler(false, "token invalido!"));
      }

      const now = Date();
      if (now > user.passwordResetExpires) {
        return res.status(400).send(returnsHandler(false, "token expirado!"));
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

      return res
        .status(200)
        .send(returnsHandler(true, "Senha alterada com sucesso"));
    } catch (err) {
      return res.status(400).send(returnsHandler(false, err));
    }
  }
}

module.exports = new SessionController();
