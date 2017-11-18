const QueryBuilder = require('../../../../Storage/QueryBuilder');

module.exports = class extends QueryBuilder{
  // Filters
  /**
   * Являющиеся частью объекта.
   *
   * @param {Dynamic|String} dynamic Целевой объект.
   *
   */
  part(dynamic){
    if(typeof dynamic == 'object'){
      dynamic = dynamic.id;
    }

    this.query
      .where(`${this.alias}.dynamic`, dynamic);

    return this;
  }
};
