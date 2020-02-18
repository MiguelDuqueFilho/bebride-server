"use strict";
// const { Events, EventStatus, EventTypes } = require("../../app/models");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("events", {
      id: {
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
        type: Sequelize.DATEONLY,
        allowNull: true,
        defaultValue: null
      },
      event_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        defaultValue: null
      },
      event_finish: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        defaultValue: null
      },
      event_type_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: "event_types",
          key: "id"
        },
        allowNull: true
      },
      event_status_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: "event_status",
          key: "id"
        },
        allowNull: true
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
