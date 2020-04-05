"use strict";
const sequelizePaginate = require("sequelize-paginate");

module.exports = (sequelize, DataTypes) => {
  const TaskModel = sequelize.define(
    "TaskModel",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      taskSectionId: DataTypes.INTEGER,
      taskModelName: DataTypes.STRING,
      taskModelDescription: DataTypes.STRING,
      taskModelDuration: DataTypes.INTEGER,
      taskModelPredecessor: DataTypes.INTEGER,
      taskModelSuccessor: DataTypes.INTEGER,
    },
    {}
  );
  TaskModel.associate = function (models) {
    // associations can be defined here
  };
  sequelizePaginate.paginate(TaskModel);
  return TaskModel;
};
