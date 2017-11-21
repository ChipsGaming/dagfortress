const ObjectStateHandler = require('../ObjectStateHandler');

module.exports = class{
  async build(options, container){
    return new ObjectStateHandler(
      options.player,
      await container.get('DynamicRepository').build({}, container),
      await container.get('OrganRepository').build({}, container)
    );
  }
};
