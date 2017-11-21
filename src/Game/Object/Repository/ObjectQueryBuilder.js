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
   * Вражеские объекты для данной группы.
   *
   * @param {GroupRepository} groupRepository
   * @param {Group|String} group Целевая группа.
   * @param {String} alias [optional] Псевдоним подключаемой сущности.
   *
   * @return {ObjectQueryBuilder}
   */
  enemies(groupRepository, group, alias = 'group'){
    group = group instanceof Object? group.id : group;

    this.joinGroup(groupRepository, alias)
      .enemies(group);

    return this;
  }
};
