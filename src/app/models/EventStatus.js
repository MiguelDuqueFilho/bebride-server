"use strict";
module.exports = (sequelize, DataTypes) => {
  const EventStatu = sequelize.define(
    "EventStatu",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      eventStatusName: DataTypes.STRING
    },
    {}
  );
  EventStatu.associate = function(models) {
    // EventStatu.belongsTo(models.Event, { foreignKey: "eventStatusId" });
  };
  return EventStatu;
};
