module.exports = app => {
  const get = (req, res) => {
    app
      .db("tb_users")
      .select("userId", "userName", "userEmail", "userType")
      // .whereNull('deletedAt')
      .then(users => res.json(users))
      .catch(err => res.status(500).send(err));
  };

  return { get };
};
