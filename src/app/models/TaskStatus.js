"use strict";
module.exports = (sequelize, DataTypes) => {
  const TaskStatu = sequelize.define(
    "TaskStatu",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      taskStatusName: DataTypes.STRING,
      taskStatusColor: DataTypes.STRING,
    },
    {}
  );
  TaskStatu.associate = function (models) {
    // associations can be defined here
  };
  return TaskStatu;
};
