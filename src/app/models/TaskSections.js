"use strict";
module.exports = (sequelize, DataTypes) => {
  const TaskSection = sequelize.define(
    "TaskSection",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      taskSectionName: DataTypes.STRING,
    },
    {}
  );
  TaskSection.associate = function (models) {
    // associations can be defined here
  };
  return TaskSection;
};
