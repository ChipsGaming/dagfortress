const QueryBuilder = require('../../../../Storage/QueryBuilder'),
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
   * Группы, относящиеся к данному миру.
   *
   * @param {World|String} world Целевой мир.
   * @param {AllianceRepository} allianceRepository
   * @param {String} alias [optional] Псевдоним подключаемой сущности.
   *
   * @return {GroupQueryBuilder}
   */
  inWorld(world, allianceRepository, alias = 'alliance'){
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

  /**
   * Группы с данным наименованием.
   *
   * @param {String} name Целевое наименование.
   *
   * @return {GroupQueryBuilder}
   */
  withName(name){
    this.query.where(`${this.alias}.name`, name);

    return this;
  }
};
