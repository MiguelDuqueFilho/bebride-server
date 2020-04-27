"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("downloads", [{}]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("downloads", null, {});
  },
};
