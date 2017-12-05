const Handler = require('../CreateWorldHandler');

module.exports = class{
  async build(options, container){
    return new Handler(
      await container.get('Config').build({}, container),
      await container.get('PrototypeList').build({}, container),
      await container.get('WorldRepository').build({}, container),
      await container.get('ChronoRepository').build({}, container),
      await container.get('AllianceRepository').build({}, container),
      await container.get('GroupRepository').build({}, container),
      await container.get('TaskRepository').build({}, container),
      await container.get('TaskConditionRepository').build({}, container),
      await container.get('TaskActionRepository').build({}, container),
      await container.get('TaskRewardRepository').build({}, container),
      await container.get('LocationRepository').build({}, container),
      await container.get('RoadRepository').build({}, container),
      await container.get('DynamicRepository').build({}, container),
      await container.get('OrganRepository').build({}, container),
      await container.get('PlayerRepository').build({}, container)
    );
  }
};
