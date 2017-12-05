const GameEvent = require('../../Event/GameEvent'),
  ViewModel = require('../../../View/ViewModel');

module.exports = class extends GameEvent{
  constructor(publisher){
    super('Win', publisher);
  }

  apply(worldState, view){
    view.add(new ViewModel('in_world_state/action_state/win', this));
  }
};
