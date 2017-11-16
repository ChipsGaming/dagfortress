
exports.up = function(knex, Promise) {
  return knex.schema.createTable('world', function(t){
    t.string('id').primary();
    t.string('seed').notNull();
    t.string('name').notNull();
    t.string('description').notNull();
    t.dateTime('added').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('world');
};
