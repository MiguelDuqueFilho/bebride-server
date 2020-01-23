const { User } = require("../../app/models");
const validation = require("../../util/validation");

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
}

module.exports = new SessionController();
