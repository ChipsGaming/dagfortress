const CreateWorldHandler = require('../CreateWorldHandler');

module.exports = class{
  async build(options, container){
    return new CreateWorldHandler(
      container,
      await container.get('Config').build({}, container),
      await container.get('WorldRepository').build({}, container),
      await container.get('LocationRepository').build({}, container),
      await container.get('RoadRepository').build({}, container),
      await container.get('PlayerRepository').build({}, container),
      await container.get('WorldGenerator').build({}, container)
    );
  }
};
