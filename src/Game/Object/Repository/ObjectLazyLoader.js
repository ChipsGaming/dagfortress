const LazyLoader = require('../../../Storage/LazyLoader');

module.exports = class extends LazyLoader{
  async loadWorld(worldId){
    const worldRepository = await this.container.get('WorldRepository').build({}, this.container);

    return worldRepository.find('id', worldId);
  }

  async loadLocation(locationId){
    const locationRepository = await this.container.get('LocationRepository').build({}, this.container);

    return locationRepository.find('id', locationId);
  }

  async loadTasks(groupId){
    const taskRepository = await this.container.get('TaskRepository').build({}, this.container);

    return taskRepository.fetchAll(
      taskRepository.select()
        .forGroup(this.group)
        .orderByPriority()
    );
  }

  async loadActualTasks(groupId){
    const taskRepository = await this.container.get('TaskRepository').build({}, this.container);

    return taskRepository.fetchAll(
      taskRepository.select()
        .forGroup(groupId)
        .actual()
        .orderByPriority()
    );
  }

  async loadCompletedTasks(groupId){
    const taskRepository = await this.container.get('TaskRepository').build({}, this.container);

    return taskRepository.fetchAll(
      taskRepository.select()
        .forGroup(groupId)
        .completed()
        .orderByPriority()
    );
  }

  async loadGroup(groupId){
    const groupRepository = await this.container.get('GroupRepository').build({}, this.container);

    return groupRepository.find('id', groupId);
  }
};
