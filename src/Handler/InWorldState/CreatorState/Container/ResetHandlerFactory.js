const Handler = require('../ResetHandler');

module.exports = class{
  async build(options, container){
    return new Handler(
      options.player,
      await container.get('EventJournal').build({world: options.player.world}, container)
    );
  }
};
