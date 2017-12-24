
exports.up = function(knex, Promise) {
  return knex.schema.createTable('item', function(t){
    t.string('id')
      .primary()
      .references('id').inTable('object')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.string('owner')
      .index()
      .references('id').inTable('dynamic')
      .onDelete('set null')
      .onUpdate('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('item');
};
