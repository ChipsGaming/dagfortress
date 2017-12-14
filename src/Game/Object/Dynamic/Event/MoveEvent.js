const GameEvent = require('../../../Event/GameEvent'),
  ViewModel = require('../../../../View/ViewModel');

module.exports = class extends GameEvent{
  constructor(publisher, location){
    super('Move', publisher, {
      location: location
    });
  }

  apply(worldState, view, eventJournal){
    const dynamic = worldState.getDynamic(this.publisher.id, this.publisher);

    dynamic.location = this.data.location.id;

    view.add(new ViewModel('in_world_state/action_state/move', this));
  }
};
