const AI = require('../AI');

module.exports = class{
  async build(options, container){
    const Attack = require(options.ai.attack),
      Task = require(options.ai.task),
      Move = require(options.ai.move);

    return new AI(
      await Attack.factory(options, container),
      await Task.factory(options, container),
      await Move.factory(options, container)
    );
  }
};
