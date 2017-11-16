
exports.up = function(knex, Promise) {
  return knex.schema.createTable('location', function(t){
    t.string('id').primary();
    t.string('world')
      .notNull()
      .index()
      .references('id').inTable('world')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.string('name').notNull();
    t.string('description').notNull();
    t.boolean('isStart').notNull();
    t.dateTime('added').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('location');
};
