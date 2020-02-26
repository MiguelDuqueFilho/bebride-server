"use strict";
module.exports = (sequelize, DataTypes) => {
  const EventType = sequelize.define(
    "EventType",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      eventTypeName: DataTypes.STRING,
      eventTypeResumo: DataTypes.STRING,
      eventTypeDescription: DataTypes.STRING,
      eventTypeIcon: DataTypes.STRING,
      eventTypeShow: DataTypes.STRING,
      eventTypeUrl: DataTypes.STRING
    },
    {}
  );
  EventType.associate = function(models) {};
  return EventType;
};
