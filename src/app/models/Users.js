const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authSecret } = require("../../config/config");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userName: DataTypes.STRING,
      userEmail: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      passwordHash: DataTypes.STRING,
      userType: DataTypes.INTEGER,
      passwordResetToken: {
        type: String,
        select: false
      },
      passwordResetExpires: {
        type: Date,
        select: false
      },
      deletedAt: DataTypes.DATE
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.passwordHash = await bcrypt.hash(user.password, 8);
          }
        }
      }
    }
  );

  User.prototype.checkPassword = function(password) {
    return bcrypt.compare(password, this.passwordHash);
  };

  User.prototype.generateToken = function() {
    const now = Math.floor(Date.now() / 1000);

    const payload = {
      id: this.id,
      name: this.userName,
      email: this.userEmail,
      type: this.userType,
      iat: now,
      exp: now + 60 * 60 * 24 * 1 // expire 1 days
    };

    return {
      ...payload,
      token: jwt.sign(payload, authSecret)
    };
  };

  return User;
};
