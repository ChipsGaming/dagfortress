
exports.up = function(knex, Promise) {
  return knex.schema.createTable('player', function(t){
    t.string('id').primary();
    t.dateTime('added').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('player');
};
