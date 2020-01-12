module.exports = app => {
  const save = (req, res) => {
    res.status(200).send("user save com consign");
  };

  return { save };
};
