const QueryBuilder = require('../../../../Storage/QueryBuilder');

module.exports = class extends QueryBuilder{
  // Filters
  /**
   * Награды данной задачи.
   *
   * @param {Task|String} task Целевая задача.
   *
   * @return {RewardQueryBuilder}
   */
  forTask(task){
    task = task instanceof Object? task.id : task;

    this.query.where(`${this.alias}.task`, task);

    return this;
  }
};
