const { Op } = require("sequelize");

module.exports.querySearchId = (search, param) => {
  if (typeof search === "undefined") return {};

  const { searchHeader, eventSelected } = JSON.parse(search);

  let where = {};
  let where1 = {};
  let where2 = {};

  if (typeof searchHeader !== "undefined" && searchHeader !== "") {
    const query = `%${searchHeader}%`;
    where1 = { [param]: { [Op.like]: query } };
    where = where1;
  }

  if (typeof eventSelected !== "undefined") {
    where2 = { id: { [Op.eq]: eventSelected } };

    where = where2;
  }

  if (where1 !== {} && where2 !== {}) {
    where = { ...where1, ...where2 };
  }
  return where;
};

module.exports.querySearchEventId = (search, param = "") => {
  if (typeof search === "undefined") return {};

  const { searchHeader, eventSelected } = JSON.parse(search);

  let where = {};
  let where1 = {};
  let where2 = {};

  if (param !== "") {
    if (typeof searchHeader !== "undefined" && searchHeader !== "") {
      const query = `%${searchHeader}%`;
      where1 = {
        [param]: { [Op.like]: query },
      };
      where = where1;
    }
  }

  if (typeof eventSelected !== "undefined") {
    where2 = { eventId: { [Op.eq]: eventSelected } };

    where = where2;
  }

  if (where1 !== {} && where2 !== {}) {
    where = { ...where1, ...where2 };
  }
  return where;
};
