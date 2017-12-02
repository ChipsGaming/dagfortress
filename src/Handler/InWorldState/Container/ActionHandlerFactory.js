const ActionHandler = require('../ActionHandler');

module.exports = class{
  async build(options, container){
    return new ActionHandler(
      container,
      options.player,
      await container.get('EventJournal').build({world: options.player.world}, container),
      await container.get('AIContainer').build({}, container),
      await container.get('WorldRepository').build({}, container),
      await container.get('ChronoRepository').build({}, container),
      await container.get('AllianceRepository').build({}, container),
      await container.get('GroupRepository').build({}, container),
      await container.get('DynamicRepository').build({}, container),
      await container.get('PlayerRepository').build({}, container),
      await container.get('OrganRepository').build({}, container),
      await container.get('TaskRepository').build({}, container),
      await container.get('TaskConditionRepository').build({}, container),
      await container.get('TaskConditionContainer').build({}, container),
      await container.get('TaskActionRepository').build({}, container),
      await container.get('TaskActionContainer').build({}, container),
      await container.get('TaskRewardRepository').build({}, container),
      await container.get('TaskRewardContainer').build({}, container)
    );
  }
};
