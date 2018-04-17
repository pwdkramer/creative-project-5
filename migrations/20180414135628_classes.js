
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('classes', function(table) {
      table.increments('id').primary();
      table.string('className');
      table.string('profName');
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('classes'),
  ]);
};
