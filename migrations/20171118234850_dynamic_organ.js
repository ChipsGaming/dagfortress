
exports.up = function(knex, Promise) {
  return knex.schema.createTable('dynamic_organ', function(t){
    t.string('id').primary();
    t.string('dynamic')
      .notNull()
      .index()
      .references('id').inTable('dynamic')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.string('name')
      .notNull()
      .index();
    t.integer('damage')
      .notNull();
    t.boolean('isVital')
      .notNull()
      .index();
    t.boolean('isWeapon')
      .notNull()
      .index();
    t.boolean('isLegs')
      .notNull()
      .index();
    t.boolean('isKeeping')
      .notNull()
      .index();
    t.dateTime('added')
      .notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dynamic_organ');
};
