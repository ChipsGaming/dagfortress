const AI = require('../../AI'),
  AttackFactory = require('./AttackFactory'),
  TaskFactory = require('./TaskFactory');

module.exports = class{
  async build(options, container){
    return new AI(
      await (new AttackFactory).build(options, container),
      await (new TaskFactory).build(options, container)
    );
  }
};
