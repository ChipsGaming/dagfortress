
exports.up = function(knex, Promise) {
  return knex.schema.createTable('player', function(t){
    t.string('id').primary();
    t.string('discordUser')
      .notNull()
      .index();
    t.string('world')
      .notNull()
      .index()
      .references('id').inTable('world')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.string('location')
      .notNull()
      .index()
      .references('id').inTable('location')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.dateTime('added').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('player');
};
