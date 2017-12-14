const Condition = require('../Condition');

module.exports = class{
  constructor(conditionContainer){
    this.conditionContainer = conditionContainer;
  }

  async check(task, condition, view){
    const invertCondition = new Condition(
      task,
      condition.target.type
    );
    invertCondition.target = condition.target.target;

    const checking = await this.conditionContainer
      .get(invertCondition.type)
      .build({
        condition: invertCondition,
        task: task
      }, this.conditionContainer);

    return !(await checking.check(task, invertCondition));
  }
};
