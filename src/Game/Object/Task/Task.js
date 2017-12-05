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

  // Getters
  /**
   * @return {Group} Група, которой поставлена задача.
   */
  async getGroup(){
    return this.lazyLoader.loadGroup(this.group);
  }

  /**
   * @return {Condition[]} Условия выполнения задания.
   */
  async getConditions(){
    return this.lazyLoader.loadConditions(this.id);
  }

  /**
   * @return {Action[]} Действия для выполнения задания.
   */
  async getActions(){
    return this.lazyLoader.loadActions(this.id);
  }

  /**
   * @param {World} world
   * @param {TaskActionContainer} taskActionContainer
   *
   * @return {ActionPipe} Конвеер действий, выполняющий задания
   */
  async getActionsPipe(world, taskActionContainer){
    return new ActionPipe(
      world,
      await this.getActions(),
      taskActionContainer
    );
  }

  /**
   * @return {Reward[]} Награды за выполнения задания.
   */
  async getRewards(){
    return this.lazyLoader.loadRewards(this.id);
  }
};
