const ViewModel = require('../../View/ViewModel');

module.exports = class{
  constructor(
    player,
    taskRepository
  ){
    this.player = player;
    this.taskRepository = taskRepository;
  }

  async process(message, match){
    const actualTasks = await this.taskRepository.fetchAll(
      this.taskRepository.select()
        .forGroup(this.player.group)
        .actual()
        .orderByPriority()
    );

    const completedTasks = await this.taskRepository.fetchAll(
      this.taskRepository.select()
        .forGroup(this.player.group)
        .completed()
        .orderByPriority()
    );

    return new ViewModel('in_world_state/task_list', {
      actualTasks: actualTasks,
      completedTasks: completedTasks
    });
  }
};
