module.exports = class{
  constructor(actions, taskActionContainer){
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
        action: action,
        task: task
      }, this.taskActionContainer);

    return handler.run(dynamic, action, task, this.run.bind(this));
  }
};
