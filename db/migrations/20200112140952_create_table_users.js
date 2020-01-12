exports.up = function(knex) {
  return knex.schema.createTable("tb_users", table => {
    table.increments("user_id").primary();
    table
      .integer("person_id")
      .notNull()
      .defaultTo(0);
    table.string("user_name").notNull();
    table
      .string("user_email")
      .notNull()
      .unique();
    table.string("user_password").notNull();
    table
      .integer("user_type")
      .notNull()
      .defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("tb_users");
};
