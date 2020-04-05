"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("task_models", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      task_section_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        defaultValue: 0
      },
      task_model_name: {
        type: Sequelize.STRING
      },
      task_model_description: {
        type: Sequelize.STRING
      },
      task_model_duration: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      task_model_predecessor: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        defaultValue: 0
      },
      task_model_successor: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        defaultValue: 0
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
    return queryInterface.dropTable("task_models");
  }
};
