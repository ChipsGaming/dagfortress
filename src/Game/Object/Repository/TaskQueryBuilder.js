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

  /**
   * Завершенные задачи.
   *
   * @return {TaskQueryBuilder}
   */
  completed(){
    this.query.where(`${this.alias}.isComplete`, true);

    return this;
  }

  /**
   * Актуальные задачи.
   *
   * @return {TaskQueryBuilder}
   */
  actual(){
    this.query.where(`${this.alias}.isComplete`, false);

    return this;
  }

  // Order
  /**
   * Сортировка по приоритету.
   *
   * @param {String} type Тип сортировки.
   *
   * @return {TaskQueryBuilder}
   */
  orderByPriority(type = 'ASC'){
    this.query.orderBy(`${this.alias}.priority`, type);

    return this;
  }
};
