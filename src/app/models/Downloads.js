"use strict";
const sequelizePaginate = require("sequelize-paginate");

module.exports = (sequelize, DataTypes) => {
  const Download = sequelize.define(
    "Download",
    {
      downloadTitle: DataTypes.STRING,
      downloadDescription: DataTypes.STRING,
      downloadFilename: DataTypes.STRING,
      downloadShow: DataTypes.BOOLEAN,
      downloadUploadId: DataTypes.INTEGER
    },
    {}
  );
  Download.associate = function(models) {
    // associations can be defined here
  };

  sequelizePaginate.paginate(Download);

  return Download;
};
