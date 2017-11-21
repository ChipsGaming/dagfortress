const QueryBuilder = require('../../../Storage/QueryBuilder');
const GroupQueryBuilder = require('./GroupQueryBuilder');

module.exports = class extends QueryBuilder{
  // Filters
  /**
   * Объекты из данного мира.
   *
   * @param {World|String} world Целевой мир.
   *
   * @return {ObjectQueryBuilder}
   */
  inWorld(world){
    world = world instanceof Object? world.id : world;

    this.query.where(`${this.alias}.world`, world);

    return this;
  }

  /**
   * Объекты из данной локации.
   *
   * @param {Location|String} location Целевая локация.
   *
   * @return {ObjectQueryBuilder}
   */
  inLocation(location){
    location = location instanceof Object? location.id : location;

    this.query.where(`${this.alias}.location`, location);

    return this;
  }

  /**
   * Объекты из той же локации, что и целевой объект.
   *
   * @param {Object} object Целевой объект.
   *
   * @return {ObjectQueryBuilder}
   */
  nearby(object){
    this.inLocation(object.location)
      .query.where(`${this.alias}.id`, '!=', object.id);

    return this;
  }
};
