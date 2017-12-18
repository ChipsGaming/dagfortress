const QueryBuilder = require('../../../Storage/QueryBuilder');
const GroupQueryBuilder = require('./GroupQueryBuilder');

module.exports = class extends QueryBuilder{
  // Joins
  joinGroup(groupRepository, alias = 'group'){
    this.query
      .innerJoin(
        `${groupRepository.constructor.tableName} AS ${alias}`,
        `${alias}.id`,
        `${this.alias}.group`
      );

    return new GroupQueryBuilder(this.query, alias, this);
  }

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
   * Объекты не из данной локации.
   *
   * @param {Location|String} location Целевая локация.
   *
   * @return {ObjectQueryBuilder}
   */
  outLocation(location){
    location = location instanceof Object? location.id : location;

    this.query.where(`${this.alias}.location`, '!=', location);

    return this;
  }

  /**
   * Объекты с данным именем.
   *
   * @param {String} name Целевое имя.
   *
   * @return {ObjectQueryBuilder}
   */
  withName(name){
    this.query.where(`${this.alias}.name`, '=', name);

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

  /**
   * Объекты из данного альянса.
   *
   * @param {Alliance|String} alliance Целевой альянс.
   * @param {GroupRepository} groupRepository
   * @param {String} groupAlias [optional]
   *
   * @return {ObjectQueryBuilder}
   */
  inAlliance(
    alliance,
    groupRepository,
    groupAlias = 'group'
  ){
    alliance = alliance instanceof Object? alliance.id : alliance;

    this
      .joinGroup(groupRepository, groupAlias)
      .inAlliance(alliance);

    return this;
  }

  /**
   * Объекты из данной группы.
   *
   * @param {Group|String} group Целевая группа.
   *
   * @return {ObjectQueryBuilder}
   */
  inGroup(group){
    group = group instanceof Object? group.id : group;

    this.query.where(`${this.alias}.group`, group);

    return this;
  }

  /**
   * Враждебные объекты.
   *
   * @param {Alliance} alliance Целевой альянс.
   * @param {GroupRepository} groupRepository
   * @param {AllianceRepository} allianceRepository
   * @param {String} groupAlias [optional]
   * @param {String} allianceAlias [optional]
   *
   * @return {ObjectQueryBuilder}
   */
  enemies(
    alliance,
    groupRepository,
    allianceRepository,
    groupAlias = 'group',
    allianceAlias = 'alliance'
  ){
    alliance = alliance instanceof Object? alliance.id : alliance;

    this
      .joinGroup(groupRepository, groupAlias)
      .joinAlliance(allianceRepository, allianceAlias)
      .enemies(alliance);

    return this;
  }
};
