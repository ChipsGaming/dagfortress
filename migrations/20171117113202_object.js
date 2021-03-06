
exports.up = function(knex, Promise) {
  return knex.schema.createTable('object', function(t){
    t.string('id').primary();
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
    t.string('name')
      .index()
      .notNull();
    t.dateTime('added').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('object');
};
