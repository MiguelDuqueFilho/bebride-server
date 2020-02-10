"use strict";
// const { Events, EventStatus, EventTypes } = require("../../app/models");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("events", {
      event_id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      event_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      event_description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      event_start: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      },
      event_date: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      },
      event_finish: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      },
      event_type_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      event_status_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      address_id: {
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
    return queryInterface.dropTable("events");
  }
};
