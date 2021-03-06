const Handler = require('../EnterLocationHandler');

module.exports = class{
  async build(options, container){
    return new Handler(
      options.player,
      await container.get('EventJournal').build({world: options.player.world}, container),
      await container.get('LocationRepository').build({}, container),
      await container.get('RoadRepository').build({}, container)
    );
  }
};
