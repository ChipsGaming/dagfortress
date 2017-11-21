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
    const actualTasks = await this.taskRepository.select()
      .forGroup(this.player.group)
      .actual()
      .orderByPriority()
      .build();

    const completedTasks = await this.taskRepository.select()
      .forGroup(this.player.group)
      .completed()
      .orderByPriority()
      .build();

    return new ViewModel('in_world_state/task_list', {
      actualTasks: actualTasks,
      completedTasks: completedTasks
    });
  }
};
