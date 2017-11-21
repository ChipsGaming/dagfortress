const QueryBuilder = require('../../../Storage/QueryBuilder');

module.exports = class extends QueryBuilder{
  // Filters
  /**
   * Задачи данной группы.
   *
   * @param {Group|String} group Целевая группа.
   *
   * @return {TaskQueryBuilder}
   */
  forGroup(group){
    group = group instanceof Object? group.id : group;

    this.query.where(`${this.alias}.group`, group);

    return this;
  }

  /**
   * Задачи заданного типа.
   *
   * @param {String} type Тип задач.
   *
   * @return {TaskQueryBuilder}
   */
  withType(type){
    this.query.where(`${this.alias}.type`, type);

    return this;
  }
};
