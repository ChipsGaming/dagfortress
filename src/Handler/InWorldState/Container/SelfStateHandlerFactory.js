const SelfStateHandler = require('../SelfStateHandler');

module.exports = class{
  async build(options, container){
    return new SelfStateHandler(
      options.player,
      await container.get('OrganRepository').build({}, container),
    );
  }
};
