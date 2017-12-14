const GameEvent = require('../../../Event/GameEvent'),
  DieEvent = require('./DieEvent'),
  ViewModel = require('../../../../View/ViewModel');

module.exports = class extends GameEvent{
  constructor(
    publisher,
    weapon,
    target,
    targetOrgan,
    damage,
    isMiss
  ){
    super('Attacks', publisher, {
      weapon: weapon,
      target: target,
      targetOrgan: targetOrgan,
      damage: damage,
      isMiss: isMiss
    });
  }

  apply(worldState, view, eventJournal){
    const target = worldState.getDynamic(this.data.target.id, this.data.target),
      targetOrgan = worldState.getOrgan(this.data.targetOrgan.id, this.data.targetOrgan);

    targetOrgan.damage += this.data.damage;

    if(targetOrgan.damage >= 10 && targetOrgan.dynamic !== null){
      worldState.deleteOrgan(targetOrgan);
      targetOrgan.dynamic = null;
  
      if(targetOrgan.isVital && !target.isDie){
        target.isDie = true;
        eventJournal.trigger(new DieEvent(target));
      }
    }

    view.add(new ViewModel('in_world_state/action_state/attack', this));
  }
};
