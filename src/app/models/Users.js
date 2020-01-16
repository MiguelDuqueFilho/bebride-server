module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    userName: DataTypes.STRING,
    userEmail: DataTypes.STRING,
    passwordHash: DataTypes.STRING
  });

  return User;
};
