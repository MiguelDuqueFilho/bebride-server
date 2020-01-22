const { sequelize } = require("../../src/app/models");

module.exports = () => {
  return Promise.All(
    Object.keys(sequelize.models).map(key => {
      return sequelize.models[key].destroy({ truncate: true, force: true });
    })
  );
};
