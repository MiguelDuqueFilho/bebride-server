"use strict";
module.exports = (sequelize, DataTypes) => {
  const EventType = sequelize.define(
    "EventType",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      eventTypeName: DataTypes.STRING
    },
    {}
  );
  EventType.associate = function(models) {
    // EventType.belongsTo(models.Event, {
    //   sourceKey: "id",
    //   foreignKey: "eventTypeId"
    // });
  };
  return EventType;
};
