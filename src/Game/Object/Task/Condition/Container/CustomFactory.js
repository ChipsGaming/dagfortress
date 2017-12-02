const Condition = require('../Custom');

module.exports = class{
  async build(options, container){
    const Handler = require(options.condition.target.handler);

    return new Condition(
      await Handler.factory(options, container)
    );
  }
};
