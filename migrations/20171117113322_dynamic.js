
exports.up = function(knex, Promise) {
  return knex.schema.createTable('dynamic', function(t){
    t.string('id')
      .primary()
      .references('id').inTable('object')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.integer('endurance')
      .notNull();
    t.integer('currentEndurance')
      .notNull();
    t.boolean('isDie')
      .notNull()
      .index();
    t.string('ai')
      .notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dynamic');
};
