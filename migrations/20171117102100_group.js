
exports.up = function(knex, Promise) {
  return knex.schema.createTable('group', function(t){
    t.string('id').primary();
    t.string('alliance')
      .notNull()
      .index()
      .references('id').inTable('alliance')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.string('name')
      .notNull();
    t.boolean('isPlayer')
      .notNull()
      .index();
    t.dateTime('added').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('group');
};
