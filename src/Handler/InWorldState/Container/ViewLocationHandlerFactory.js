const ViewLocationHandler = require('../ViewLocationHandler');

module.exports = class{
  async build(options, container){
    return new ViewLocationHandler(
      options.player,
      await container.get('WorldRepository').build({}, container),
      await container.get('ChronoRepository').build({}, container),
      await container.get('LocationRepository').build({}, container),
      await container.get('RoadRepository').build({}, container),
      await container.get('DynamicRepository').build({}, container),
      await container.get('PlayerRepository').build({}, container)
    );
  }
};
