const ObjectStateHandler = require('../ObjectStateHandler');

module.exports = class{
  async build(options, container){
    return new ObjectStateHandler(
      options.player,
      await container.get('PlayerRepository').build({}, container),
      await container.get('OrganRepository').build({}, container)
    );
  }
};
