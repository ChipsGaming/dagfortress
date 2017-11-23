const WaitHandler = require('../WaitHandler');

module.exports = class{
  async build(options, container){
    return new WaitHandler(
      options.player,
      await container.get('PlayerRepository').build({}, container)
    );
  }
};
