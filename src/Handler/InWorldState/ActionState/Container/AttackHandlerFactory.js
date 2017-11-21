const AttackHandler = require('../AttackHandler');

module.exports = class{
  async build(options, container){
    return new AttackHandler(
      options.player,
      container,
      await container.get('DynamicRepository').build({}, container),
      await container.get('OrganRepository').build({}, container)
    );
  }
};
