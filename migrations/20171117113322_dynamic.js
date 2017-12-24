
exports.up = function(knex, Promise) {
  return knex.schema.createTable('dynamic', function(t){
    t.string('id')
      .primary()
      .references('id').inTable('object')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.string('group')
      .notNull()
      .index()
      .references('id').inTable('group')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.integer('hitPoints')
      .notNull();
    t.boolean('isDie')
      .notNull()
      .index();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dynamic');
};
