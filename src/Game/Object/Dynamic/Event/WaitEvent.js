const GameEvent = require('../../../Event/GameEvent'),
  ViewModel = require('../../../../View/ViewModel');

module.exports = class extends GameEvent{
  constructor(publisher){
    super('Wait', publisher);
  }

  apply(worldState, view, eventJournal){
    view.add(new ViewModel('in_world_state/action_state/wait', this));
  }
};
