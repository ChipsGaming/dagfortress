
exports.up = function(knex, Promise) {
  return knex.schema.createTable('road', function(t){
    t.string('id').primary();
    t.string('start')
      .notNull()
      .index()
      .references('id').inTable('location')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.string('end')
      .notNull()
      .index()
      .references('id').inTable('location')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.dateTime('added').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('road');
};
