const ObjectLazyLoader = require('../../Repository/ObjectLazyLoader');

module.exports = class extends ObjectLazyLoader{
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

  async loadNearbyDynamics(dynamic){
    const dynamicRepository = await this.container.get('DynamicRepository').build({}, this.container);

    return dynamicRepository.fetchAll(
      dynamicRepository.select()
        .nearby(dynamic)
    );
  }

  async loadItems(dynamicId){
    const itemRepository = await this.container.get('ItemRepository').build({}, this.container);

    return itemRepository.fetchAll(
      itemRepository.select()
        .owner(dynamicId)
    );
  }
};
