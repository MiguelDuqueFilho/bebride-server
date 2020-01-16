module.exports = app => {
  const get = async (req, res) => {
    const users = await app.db.User.findAll();
    res.json(users).send();
  };

  const save = async (req, res) => {
    const users = await app.db.User.create({
      user_name: "Miguel",
      user_email: "miguel.duque@gmail.com",
      password_hash: "12234456677889990xxxxxxxxxx"
    });
    res.status(200).send();
  };

  return { get, save };
};
