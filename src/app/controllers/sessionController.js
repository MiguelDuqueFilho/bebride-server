const bcrypt = require("bcryptjs");
const { authSecret } = require("../../config/config");
const jwt = require("jsonwebtoken");

module.exports = app => {
  const {
    existsOrError,
    notExistsOrError,
    equalsOrError
  } = app.src.util.validation;

  const signin = async (req, res) => {
    try {
      const { userEmail, password } = req.body;

      existsOrError(userEmail, "E-mail não informado");
      existsOrError(password, "Senha não informada");

      const user = await app.db.User.findOne({ where: { userEmail } });

      existsOrError(user, "Usuário não encontrado!");

      if (!bcrypt.compareSync(password, user.passwordHash)) {
        return res.status(401).json({ message: "Email/Senha inválidos!" });
      }

      const now = Math.floor(Date.now() / 1000);

      const payload = {
        id: user.id,
        name: user.userName,
        email: user.userEmail,
        type: user.userType,
        iat: now,
        exp: now + 60 * 60 * 24 * 3 // expire 3 dais
      };

      res.json({
        ...payload,
        token: jwt.sign(payload, authSecret)
      });
    } catch (err) {
      console.log(err);
      return res.status(401).json({ message: err });
    }
  };

  return { signin };
};
