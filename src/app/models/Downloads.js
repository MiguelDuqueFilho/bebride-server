"use strict";
module.exports = (sequelize, DataTypes) => {
  const Download = sequelize.define(
    "Download",
    {
      downloadTitle: DataTypes.STRING,
      downloadDescription: DataTypes.STRING,
      downloadFilename: DataTypes.STRING,
      downloadShow: DataTypes.BOOLEAN
    },
    {}
  );
  Download.associate = function(models) {
    // associations can be defined here
  };
  return Download;
};
