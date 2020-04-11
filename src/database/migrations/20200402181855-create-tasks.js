"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("tasks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11),
      },
      event_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: 0,
      },
      task_model_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        defaultValue: 0,
      },
      task_section_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        defaultValue: 0,
      },
      task_name: {
        type: Sequelize.STRING,
      },
      task_description: {
        type: Sequelize.STRING,
      },
      task_duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      task_start: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        defaultValue: null,
      },
      task_time: {
        type: Sequelize.TIME,
        allowNull: true,
        defaultValue: null,
      },
      task_finish: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        defaultValue: null,
      },
      task_completed: {
        type: Sequelize.TINYINT,
        allowNull: true,
      },
      task_predecessor: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        defaultValue: 0,
      },
      task_successor: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        defaultValue: 0,
      },
      task_status_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: 1,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tasks");
  },
};
