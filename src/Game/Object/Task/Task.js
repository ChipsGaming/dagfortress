const Uuid = require('uuid/v4'),
  ActionPipe = require('./ActionPipe');

module.exports = class{
  constructor(group, name, description){
    this.id = Uuid();
    this.group = group;
    this.name = name;
    this.description = description;
    this.priority = 1;
    this.isComplete = false;
    this.added = null;
  }

  /**
   * @param {TaskConditionRepository} taskConditionRepository
   *
   * @return {Condition[]} Условия выполнения задания.
   */
  async getConditions(taskConditionRepository){
    return taskConditionRepository.fetchAll(
      taskConditionRepository.select()
        .forTask(this)
    );
  }

  /**
   * @param {TaskActionRepository} taskActionRepository
   *
   * @return {Action[]} Действия для выполнения задания.
   */
  async getActions(taskActionRepository){
    return taskActionRepository.fetchAll(
      taskActionRepository.select()
        .forTask(this)
    );
  }

  /**
   * @param {TaskActionRepository} taskActionRepository
   * @param {TaskActionContainer} taskActionContainer
   *
   * @return {ActionPipe} Конвеер действий, выполняющий задания
   */
  async getActionsPipe(taskActionRepository, taskActionContainer){
    return new ActionPipe(
      await this.getActions(taskActionRepository),
      taskActionContainer
    );
  }

  /**
   * @param {TaskRewardRepository} taskRewardRepository
   *
   * @return {Reward[]} Награды за выполнения задания.
   */
  async getRewards(taskRewardRepository){
    return taskRewardRepository.fetchAll(
      taskRewardRepository.select()
        .forTask(this)
    );
  }
};
