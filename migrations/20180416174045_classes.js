exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('classes', function(table) {
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('classes'),
  ]);
};
