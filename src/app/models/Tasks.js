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
    {
      hooks: {
        beforeSave: async (task) => {
          if (task.taskDuration === 0) {
            task.taskFinish = task.taskStart;
          } else {
            task.taskTime = "00:00:00";
          }
          if (task.taskStatusId === "5") {
            task.taskCompleted = 100;
          } else {
            if (task.taskCompleted === 100) {
              task.taskStatusId = "5";
            }
          }
        },
      },
    }
  );
  Task.associate = function (models) {
    Task.hasMany(models.Event, {
      sourceKey: "eventId",
      foreignKey: "id",
    });
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
