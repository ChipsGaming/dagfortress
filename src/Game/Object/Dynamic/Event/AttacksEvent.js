const GameEvent = require('../../../Event/GameEvent'),
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

  apply(worldState, view){
    if(this.data.isMiss){
      return;
    }

    const target = worldState.getDynamic(this.data.target.id, this.data.target),
      targetOrgan = worldState.getOrgan(this.data.targetOrgan.id, this.data.targetOrgan);

    targetOrgan.damage += this.data.damage;

    view.add(new ViewModel('in_world_state/action_state/attack', this));
  }
};
