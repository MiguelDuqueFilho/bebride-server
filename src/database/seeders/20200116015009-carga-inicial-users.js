"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        user_name: "Admin",
        user_email: "admin@globo.com",
        password_hash:
          "$2a$08$prJzB5C70pZxT/jPqAisfus70ecaRcGS5visJkuqRnHn5oBxJklQS",
        user_type: 1
      },
      {
        user_name: "Miguel Duque Filho",
        user_email: "miguel.duque@globo.com",
        password_hash:
          "$2a$08$prJzB5C70pZxT/jPqAisfus70ecaRcGS5visJkuqRnHn5oBxJklQS",
        user_type: 1
      },
      {
        user_name: "Wilma Area Duque",
        user_email: "wilma.duque@globo.com",
        password_hash:
          "$2a$08$LoCjPaMb2nJvSHlxougvbOjuRONf4zIbKv4oG2HXdi.lyNk5Vq5RO",
        user_type: 0
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  }
};
