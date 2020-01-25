const { User } = require("../../app/models");
const validation = require("../../util/validation");
const crypto = require("crypto");
const mailer = require("../../app/modules/mailer");

class SessionController {
  async login(req, res) {
    try {
      const { userEmail, password } = req.body;
      validation.existsOrError(userEmail, "E-mail não informado");
      validation.existsOrError(password, "Senha não informada");

      const user = await User.findOne({ where: { userEmail } });

      validation.existsOrError(user, "Usuário não encontrado!");

      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ message: "Email/Senha inválidos!" });
      }

      return res.json(user.generateToken());
    } catch (err) {
      return res.status(401).json({ message: err });
    }
  }
  async logoff(req, res) {
    return res.status(200).json({
      name: req.decode.name,
      email: req.decode.email,
      message: "User logoff!"
    });
  }

  async forgotPassword(req, res) {
    const { userEmail } = req.body;
    console.log(userEmail);
    try {
      const user = await User.findOne({
        where: { userEmail }
      });

      validation.existsOrError(user, "Usuário não cadastrado");

      const token = crypto.randomBytes(20).toString("hex");

      const now = new Date();

      now.setHours(now.getHours() + 1);

      console.log(token, now);

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
        context: { token }
      });
      console.log(info);
      return res.send(info);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: error });
    }
  }
  async resetPassword(req, res) {
    const { userEmail, token, password } = req.body;

    try {
      const user = await User.findOne({
        where: { userEmail }
      });

      console.log(user);

      validation.existsOrError(user, "Usuário não cadastrado");

      if (token !== user.passwordResetToken) {
        return res.status(400).send({ error: "token invalido!" });
      }

      const now = Date();
      if (now > user.passwordResetExpires) {
        return res.status(400).send({
          error: "token expirado!"
        });
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

      return res.status(200).send();
    } catch (error) {
      return res.status(400).send({ error: error });
    }
  }
}

module.exports = new SessionController();
