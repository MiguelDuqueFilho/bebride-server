exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("tb_users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("tb_users").insert([
        {
          user_id: 1,
          person_id: "0",
          user_name: "Miguel Duque Filho",
          user_email: "miguel.duque@globo.com",
          user_password: "123456",
          user_type: "1"
        },
        {
          user_id: 2,
          person_id: "0",
          user_name: "Bruna Duque",
          user_email: "bruna.duque@globo.com",
          user_password: "123456",
          user_type: "0"
        }
      ]);
    });
};
