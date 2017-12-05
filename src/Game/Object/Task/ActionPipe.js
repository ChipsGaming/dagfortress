module.exports = class{
  constructor(world, actions, taskActionContainer){
    this.world = world;
    this.actions = actions;
    this.taskActionContainer = taskActionContainer;
  }

  push(action){
    this.actions.push(action);
  }

  async run(dynamic, action, task){
    action = this.actions.shift();
    const handler = await this.taskActionContainer
      .get(action.type)
      .build({
        world: this.world,
        action: action,
        task: task
      }, this.taskActionContainer);

    return handler.run(dynamic, action, task, this.run.bind(this));
  }
};
