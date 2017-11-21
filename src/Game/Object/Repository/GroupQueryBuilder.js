const QueryBuilder = require('../../../Storage/QueryBuilder');

module.exports = class extends QueryBuilder{
  // Filters
  /**
   * Группы данного союза.
   *
   * @param {Alliance|String} alliance Целевой союз.
   *
   * @return {GroupQueryBuilder}
   */
  inAlliance(alliance){
    alliance = alliance instanceof Object? alliance.id : alliance;

    this.query.where(`${this.alias}.alliance`, alliance);

    return this;
  }

  /**
   * Группа игроков.
   *
   * @return {GroupQueryBuilder}
   */
  forPlayer(){
    this.query.where(`${this.alias}.isPlayer`, true);

    return this;
  }
};
