module.exports = app => {
  const get = (req, res) => {
    res.status(200).send();
  };
  return { get };
};
