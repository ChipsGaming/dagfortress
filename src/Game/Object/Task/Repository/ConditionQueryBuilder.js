const QueryBuilder = require('../../../../Storage/QueryBuilder');

module.exports = class extends QueryBuilder{
  // Filters
  /**
   * Условия данной задачи.
   *
   * @param {Task|String} task Целевая задача.
   *
   * @return {ConditionQueryBuilder}
   */
  forTask(task){
    task = task instanceof Object? task.id : task;

    this.query.where(`${this.alias}.task`, task);

    return this;
  }
};
