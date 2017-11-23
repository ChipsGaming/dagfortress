const MoveAndAttackTask = require('../MoveAndAttackTask');

module.exports = class{
  async build(options, container){
    return new MoveAndAttackTask(
      await container.get('AIContainer').build({}, container),
      await container.get('AllianceRepository').build({}, container),
      await container.get('GroupRepository').build({}, container),
      await container.get('LocationRepository').build({}, container),
      await container.get('RoadRepository').build({}, container),
      await container.get('DynamicRepository').build({}, container)
    );
  }
};
