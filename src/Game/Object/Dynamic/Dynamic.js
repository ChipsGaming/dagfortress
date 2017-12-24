const Object = require('../Object');

module.exports = class extends Object{
  constructor(world, location, group, name){
    super(world, location, name);
    this.group = group;
    this.hitPoints = 10;
    this.isDie = false;

    this.lazyLoader = null;
  }

  // Getters
  /**
   * @return {Group} Группа.
   */
  async getGroup(){
    return this.lazyLoader.loadGroup(this.group);
  }

  /**
   * @return {Dynamic[]} Органы объекта.
   */
  async getNearbyDynamics(){
    return await this.lazyLoader.loadNearbyDynamics(this);
  }

  /**
   * @return {Task[]} Актуальные задачи.
   */
  async getActualTasks(){
    return this.lazyLoader.loadActualTasks(this.group);
  }

  /**
   * @return {Task[]} Завершенные задачи.
   */
  async getCompletedTasks(){
    return this.lazyLoader.loadCompletedTasks(this.group);
  }

  /**
   * @return {Item[]} Предметы.
   */
  async getItems(){
    return this.lazyLoader.loadItems(this.id);
  }
};
