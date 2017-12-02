const Uuid = require('uuid/v4');
const EventJournal = require('../../Event/EventJournal');

module.exports = class{
  constructor(world, location, group, name){
    this.id = Uuid();
    this.world = world;
    this.location = location;
    this.group = group;
    this.name = name;
    this.added = null;

    this.events = new EventJournal;
  }

  // Getters
  /**
   * @param {LocationRepository} locationRepository
   *
   * @return {Location} Текущая локация объекта.
   */
  async getCurrentLocation(locationRepository){
    return locationRepository.find('id', this.location);
  }

  /**
   * @param {TaskRepository} taskRepository
   *
   * @return {Task[]} Актуальные задачи.
   */
  async getActualTasks(taskRepository){
    return taskRepository.fetchAll(
      taskRepository.select()
        .forGroup(this.group)
        .actual()
        .orderByPriority()
    );
  }

  /**
   * @param {TaskRepository} taskRepository
   *
   * @return {Task[]} Завершенные задачи.
   */
  async getCompletedTasks(taskRepository){
    return taskRepository.fetchAll(
      taskRepository.select()
        .forGroup(this.group)
        .completed()
        .orderByPriority()
    );
  }

  /**
   * @param {GroupRepository} groupRepository
   *
   * @return {Group} Группа.
   */
  async getGroup(groupRepository){
    return groupRepository.find('id', this.group);
  }
};
