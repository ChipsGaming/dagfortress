const Action = require('../Custom');

module.exports = class{
  async build(options, container){
    const Handler = require(options.action.target.handler);

    return new Action(
      await Handler.factory(options, container)
    );
  }
};
