const { Op } = require("sequelize");

module.exports.extractFileType = (str) => {
  var path_splitted = str.split(".");
  var extension = path_splitted.pop();
  return extension;
};

module.exports.querySearchTask = (search) => {
  if (typeof search === "undefined") return {};

  const { searchHeader, eventSelected } = JSON.parse(search);

  let where = {};
  let where1 = {};
  let where2 = {};

  if (typeof searchHeader !== "undefined" && searchHeader !== "") {
    const query = `%${searchHeader}%`;
    where1 = { taskName: { [Op.like]: query } };
    where = where1;
    console.log("querySearchTask where1 >>>>>>>>");
    console.log(where1);
  }

  if (typeof eventSelected !== "undefined") {
    where2 = { eventId: { [Op.eq]: eventSelected } };

    where = where2;
    console.log("querySearchTask where2 >>>>>>>>");
    console.log(where2);
  }

  if (where1 !== {} && where2 !== {}) {
    where = { ...where1, ...where2 };
    console.log("querySearchTask where>>>>>>>>");
    console.log(where);
  }
  return where;
};
