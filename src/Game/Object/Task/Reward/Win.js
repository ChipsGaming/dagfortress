const ViewModel = require('../../../../View/ViewModel');

module.exports = class{
  async reward(task, reward, view){
    const alliance = await (await task.getGroup()).getAlliance();

    view.add(
      new ViewModel('in_world_state/action_state/win', alliance)
    );
  }
};
