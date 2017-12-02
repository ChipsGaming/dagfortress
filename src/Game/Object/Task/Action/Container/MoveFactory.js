const Action = require('../Move');

module.exports = class{
  async build(options, container){
    return new Action(
      await container.get('LocationRepository').build({}, container),
      await container.get('RoadRepository').build({}, container),
      await container.get('DynamicRepository').build({}, container)
    );
  }
};
