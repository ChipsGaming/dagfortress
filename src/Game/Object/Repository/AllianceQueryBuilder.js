const QueryBuilder = require('../../../Storage/QueryBuilder');

module.exports = class extends QueryBuilder{
  // Filters
  /**
   * Союзы данного мира.
   *
   * @param {World|String} world Целевой мир.
   *
   * @return {AllianceQueryBuilder}
   */
  inWorld(world){
    world = world instanceof Object? world.id : world;

    this.query.where(`${this.alias}.world`, world);

    return this;
  }

  /**
   * Вражеские союзы.
   *
   * @param {Alliance|String} alliance Целевой союз.
   *
   * @return {AllianceQueryBuilder}
   */
  enemies(alliance){
    alliance = alliance instanceof Object? alliance.id : alliance;

    this.query.where(`${this.alias}.id`, '!=', alliance);

    return this;
  }
};
