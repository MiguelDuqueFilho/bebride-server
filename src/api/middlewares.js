module.exports = app => {
  const timescan = (req, res, next) => {
    var m = new Date();
    const dateString =
      m.getFullYear() +
      "/" +
      (m.getMonth() + 1) +
      "/" +
      m.getDate() +
      " " +
      m.getHours() +
      ":" +
      m.getMinutes() +
      ":" +
      m.getSeconds();
    console.log(
      `-- Time: ${dateString} -- Request Type: ${req.method} -- Request URL: ${req.originalUrl}`
    );

    next();
  };

  return { timescan };
};
