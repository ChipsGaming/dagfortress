
exports.up = function(knex, Promise) {
  return knex.schema.createTable('task_reward', function(t){
    t.string('id').primary();
    t.string('task')
      .notNull()
      .index()
      .references('id').inTable('task')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.string('type')
      .notNull();
    t.string('target')
      .notNull();
    t.dateTime('added').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('task_reward');
};
