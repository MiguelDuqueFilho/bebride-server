module.exports = app => {
  const get = (req, res) => {
    app
      .db("tb_users")
      .select("user_id", "user_name", "user_email", "user_type")
      // .whereNull('deletedAt')
      .then(users => res.json(users))
      .catch(err => res.status(500).send(err));
  };

  return { get };
};
