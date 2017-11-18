const ActionHandler = require('../ActionHandler');

module.exports = class{
  async build(options, container){
    return new ActionHandler(
      container,
      options.player,
      await container.get('DynamicRepository').build({}, container),
      await container.get('PlayerRepository').build({}, container)
    );
  }
};
