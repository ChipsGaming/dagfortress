
exports.up = function(knex, Promise) {
  return knex.schema.createTable('player', function(t){
    t.string('id').primary();
    t.string('discordUser').notNull();
    t.string('world').nullable();
    t.dateTime('added').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('player');
};
