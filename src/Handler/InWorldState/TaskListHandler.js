const ViewModel = require('../../View/ViewModel');

module.exports = class{
  constructor(
    player
  ){
    this.player = player;
  }

  async process(message, match){
    const actualTasks = await this.player.getActualTasks(),
      completedTasks = await this.player.getCompletedTasks();

    return new ViewModel('in_world_state/task_list', {
      actualTasks: actualTasks,
      completedTasks: completedTasks
    });
  }
};
