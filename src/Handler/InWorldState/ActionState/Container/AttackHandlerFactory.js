const Handler = require('../AttackHandler');

module.exports = class{
  async build(options, container){
    return new Handler(
      options.player,
      await container.get('EventJournal').build({world: options.player.world}, container),
      await container.get('AIContainer').build({}, container),
      await container.get('DynamicRepository').build({}, container),
      await container.get('PlayerRepository').build({}, container),
      await container.get('OrganRepository').build({}, container)
    );
  }
};
