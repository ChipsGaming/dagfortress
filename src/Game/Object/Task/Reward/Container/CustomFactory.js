const Reward = require('../Custom');

module.exports = class{
  async build(options, container){
    const Handler = require(options.condition.target.handler);

    return new Reward(
      await Handler.factory(options, container)
    );
  }
};
