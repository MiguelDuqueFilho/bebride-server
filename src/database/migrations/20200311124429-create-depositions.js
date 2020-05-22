"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("depositions", {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      event_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: 0,
      },
      deposition_title: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      deposition_description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      deposition_filename: {
        type: Sequelize.STRING(128),
      },
      upload_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      deposition_show: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    return queryInterface.dropTable("depositions");
  },
};
