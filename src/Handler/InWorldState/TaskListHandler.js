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
    const actualTasks = await this.player.getActualTasks(this.taskRepository),
      completedTasks = await this.player.getCompletedTasks(this.taskRepository);

    return new ViewModel('in_world_state/task_list', {
      actualTasks: actualTasks,
      completedTasks: completedTasks
    });
  }
};
