const Condition = require('../OwnsItem');

module.exports = class{
  async build(options, container){
    return new Condition(
      await container.get('LocationRepository').build({}, container),
      await container.get('ItemRepository').build({}, container)
    );
  }
};
