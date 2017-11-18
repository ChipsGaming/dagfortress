const EnterWorldHandler = require('../EnterWorldHandler');

module.exports = class{
  async build(options, container){
    return new EnterWorldHandler(
      await container.get('Config').build({}, container),
      await container.get('WorldRepository').build({}, container),
      await container.get('LocationRepository').build({}, container),
      await container.get('PlayerRepository').build({}, container)
    );
  }
};