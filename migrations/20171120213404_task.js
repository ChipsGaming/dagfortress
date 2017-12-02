
exports.up = function(knex, Promise) {
  return knex.schema.createTable('task', function(t){
    t.string('id').primary();
    t.string('group')
      .notNull()
      .index()
      .references('id').inTable('group')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.string('name')
      .notNull();
    t.string('description')
      .notNull();
    t.string('priority')
      .notNull();
    t.boolean('isComplete')
      .index()
      .notNull();
    t.dateTime('added').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('task');
};
