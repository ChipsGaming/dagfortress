const GameEvent = require('../../../Event/GameEvent'),
  DieEvent = require('./DieEvent'),
  ViewModel = require('../../../../View/ViewModel');

module.exports = class extends GameEvent{
  constructor(
    publisher,
    target,
    damage,
    isMiss
  ){
    super('Attacks', publisher, {
      target: target,
      damage: damage,
      isMiss: isMiss
    });
  }

  apply(worldState, view, eventJournal){
    const target = worldState.getDynamic(this.data.target.id, this.data.target);

    target.hitPoints -= this.data.damage;

    if(target.hitPoints <= 0 && !target.isDie){
      target.isDie = true;
      eventJournal.trigger(new DieEvent(target));
    }

    view.add(new ViewModel('in_world_state/action_state/attack', this));
  }
};
