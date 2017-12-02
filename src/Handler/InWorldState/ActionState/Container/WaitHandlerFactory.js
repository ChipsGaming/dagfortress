const WaitHandler = require('../WaitHandler');

module.exports = class{
  async build(options, container){
    return new WaitHandler(
      options.player,
      await container.get('EventJournal').build({world: options.player.world}, container),
      await container.get('PlayerRepository').build({}, container)
    );
  }
};
