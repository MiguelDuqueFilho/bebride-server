"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        user_name: "Admin",
        user_email: "admin@globo.com",
        password_hash:
          "$2a$08$prJzB5C70pZxT/jPqAisfus70ecaRcGS5visJkuqRnHn5oBxJklQS",
        user_type: 1,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
