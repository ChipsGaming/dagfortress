const ObjectQueryBuilder = require('../../Repository/ObjectQueryBuilder'),
  GroupQueryBuilder = require('./GroupQueryBuilder');

module.exports = class extends ObjectQueryBuilder{
  constructor(
    query,
    objectAlias,
    dynamicAlias,
    parent = null
  ){
    super(query, objectAlias, parent);
    this.dynamicAlias = dynamicAlias;
  }

  // Joins
  joinGroup(groupRepository, alias = 'group'){
    this.query
      .innerJoin(
        `${groupRepository.constructor.tableName} AS ${alias}`,
        `${alias}.id`,
        `${this.dynamicAlias}.group`
      );

    return new GroupQueryBuilder(this.query, alias, this);
  }

  // Filters
  /**
   * Мертвые объекты.
   *
   * @return {DynamicQueryBuilder}
   */
  die(){
    this.query.where(`${this.dynamicAlias}.isDie`, true);

    return this;
  }

  /**
   * Живые объекты.
   *
   * @return {DynamicQueryBuilder}
   */
  alive(){
    this.query.where(`${this.dynamicAlias}.isDie`, false);

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

    this.query.where(`${this.dynamicAlias}.group`, group);

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
