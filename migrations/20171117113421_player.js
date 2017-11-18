
exports.up = function(knex, Promise) {
  return knex.schema.createTable('player', function(t){
    t.string('id')
      .primary()
      .references('id').inTable('dynamic')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.string('discordUser')
      .notNull()
      .index();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('player');
};
