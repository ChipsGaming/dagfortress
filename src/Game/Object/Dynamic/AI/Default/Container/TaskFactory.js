const Task = require('../Task');

module.exports = class{
  async build(options, container){
    return new Task(
      options.dynamic,
      await container.get('TaskRepository').build({}, container)
    );
  }
};
