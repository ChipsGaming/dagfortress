const MoveTask = require('../MoveTask');

module.exports = class{
  async build(options, container){
    return new MoveTask(
      await container.get('LocationRepository').build({}, container),
      await container.get('RoadRepository').build({}, container),
      await container.get('DynamicRepository').build({}, container)
    );
  }
};
