"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("event_types", {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      event_type_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      event_type_resumo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      event_type_description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      event_type_icon: {
        type: Sequelize.STRING,
        allowNull: false
      },
      event_type_show: {
        type: Sequelize.INTEGER(4),
        allowNull: false
      },
      event_type_url: {
        type: Sequelize.STRING,
        allowNull: false
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
    return queryInterface.dropTable("event_types");
  }
};
