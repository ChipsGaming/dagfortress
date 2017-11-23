
exports.up = function(knex, Promise) {
  return knex.schema.createTable('chrono', function(t){
    t.string('id').primary();
    t.string('world')
      .notNull()
      .index()
      .references('id').inTable('world')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.integer('day')
      .notNull();
    t.dateTime('added').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('chrono');
};
