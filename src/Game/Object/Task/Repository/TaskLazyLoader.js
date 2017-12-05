const LazyLoader = require('../../../../Storage/LazyLoader');

module.exports = class extends LazyLoader{
  async loadGroup(groupId){
    const groupRepository = await this.container.get('GroupRepository').build({}, this.container);

    return groupRepository.find('id', groupId);
  }

  async loadConditions(taskId){
    const conditionRepository = await this.container.get('TaskConditionRepository').build({}, this.container);

    return conditionRepository.fetchAll(
      conditionRepository.select()
        .forTask(taskId)
    );
  }

  async loadActions(taskId){
    const actionRepository = await this.container.get('TaskActionRepository').build({}, this.container);

    return actionRepository.fetchAll(
      actionRepository.select()
        .forTask(taskId)
    );
  }

  async loadRewards(taskId){
    const rewardRepository = await this.container.get('TaskRewardRepository').build({}, this.container);

    return rewardRepository.fetchAll(
      rewardRepository.select()
        .forTask(taskId)
    );
  }
};
