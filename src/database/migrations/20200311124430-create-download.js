"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("downloads", {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      download_title: {
        type: Sequelize.STRING(64),
        allowNull: false,
        defaultValue: 0,
      },
      download_description: {
        type: Sequelize.STRING(256),
      },
      download_filename: {
        type: Sequelize.STRING(128),
      },
      download_show: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      upload_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: 0,
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
    return queryInterface.dropTable("downloads");
  },
};
