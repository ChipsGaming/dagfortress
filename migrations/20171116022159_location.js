
exports.up = function(knex, Promise) {
  return knex.schema.createTable('location', function(t){
    t.string('id').primary();
    t.string('world').notNull();
    t.boolean('isStart').notNull();
    t.dateTime('added').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('location');
};
