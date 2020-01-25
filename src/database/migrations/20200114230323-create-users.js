"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      person_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: 0
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      User_email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      password_reset_token: {
        type: Sequelize.STRING,
        select: false
      },
      password_reset_expires: {
        type: Sequelize.DATE,
        select: false
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  }
};
