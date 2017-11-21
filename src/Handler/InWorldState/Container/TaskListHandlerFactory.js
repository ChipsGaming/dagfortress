const TaskListHandler = require('../TaskListHandler');

module.exports = class{
  async build(options, container){
    return new TaskListHandler(
      options.player,
      await container.get('TaskRepository').build({}, container)
    );
  }
};
