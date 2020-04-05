"use strict";
const sequelizePaginate = require("sequelize-paginate");

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      eventId: DataTypes.INTEGER,
      taskModelId: DataTypes.INTEGER,
      taskSectionId: DataTypes.INTEGER,
      personId: DataTypes.INTEGER,
      taskName: DataTypes.STRING,
      taskDescription: DataTypes.STRING,
      taskDuration: DataTypes.INTEGER,
      taskStart: DataTypes.DATEONLY,
      taskTime: DataTypes.TIME,
      taskFinish: DataTypes.DATEONLY,
      taskCompleted: DataTypes.TINYINT,
      taskPredecessor: DataTypes.INTEGER,
      taskSuccessor: DataTypes.INTEGER,
      taskStatusId: DataTypes.INTEGER,
    },
    {}
  );
  Task.associate = function (models) {
    Task.hasMany(models.TaskSection, {
      sourceKey: "taskSectionId",
      foreignKey: "id",
    });
    Task.hasMany(models.TaskStatu, {
      sourceKey: "taskStatusId",
      foreignKey: "id",
    });
  };
  sequelizePaginate.paginate(Task);
  return Task;
};
