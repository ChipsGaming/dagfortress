const GameEvent = require('../../../Event/GameEvent'),
  ViewModel = require('../../../../View/ViewModel');

module.exports = class extends GameEvent{
  constructor(publisher, item){
    super('Put', publisher, {
      item: item
    });
  }

  apply(worldState, view, eventJournal){
    const item = worldState.getItem(this.data.item.id, this.data.item);

    item.location = this.publisher.location;
    item.owner = null;

    view.add(new ViewModel('in_world_state/action_state/put', this));
  }
};
