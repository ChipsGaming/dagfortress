const Uuid = require('uuid/v4');

module.exports = class{
  constructor(world, location, group, name){
    this.id = Uuid();
    this.world = world;
    this.location = location;
    this.group = group;
    this.name = name;
    this.added = null;

    this.lazyLoader = null;
  }

  // Getters
  /**
   * @return {World} Мир, которому принадлежит объект.
   */
  async getWorld(){
    return this.lazyLoader.loadWorld(this.world);
  }

  /**
   * @return {Location} Текущая локация объекта.
   */
  async getCurrentLocation(){
    return this.lazyLoader.loadLocation(this.location);
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
   * @return {Group} Группа.
   */
  async getGroup(){
    return this.lazyLoader.loadGroup(this.group);
  }
};
