const EnterLocationHandler = require('../EnterLocationHandler');

module.exports = class{
  async build(options, container){
    return new EnterLocationHandler(
      options.player,
      await container.get('LocationRepository').build({}, container),
      await container.get('RoadRepository').build({}, container),
      await container.get('PlayerRepository').build({}, container)
    );
  }
};
