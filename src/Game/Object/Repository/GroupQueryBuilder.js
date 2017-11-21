const QueryBuilder = require('../../../Storage/QueryBuilder'),
  AllianceQueryBuilder = require('./AllianceQueryBuilder');

module.exports = class extends QueryBuilder{
  // Joins
  joinAlliance(allianceRepository, alias = 'alliance'){
    this.query
      .innerJoin(
        `${allianceRepository.constructor.tableName} AS ${alias}`,
        `${alias}.id`,
        `${this.alias}.alliance`
      );

    return new AllianceQueryBuilder(this.query, alias, this);
  }

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
   * Вражеские объекты для данной группы.
   *
   * @param {GroupRepository} groupRepository
   * @param {Group|String} group Целевая группа.
   * @param {String} alias [optional] Псевдоним подключаемой сущности.
   *
   * @return {ObjectQueryBuilder}
   */
  inWorld(allianceRepository, world, alias = 'alliance'){
    world = world instanceof Object? world.id : world;

    this.joinAlliance(allianceRepository, alias)
      .inWorld(world);

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
