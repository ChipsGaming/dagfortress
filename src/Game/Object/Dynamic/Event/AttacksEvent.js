const GameEvent = require('../../../Event/GameEvent');

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

  apply(worldState){
    if(this.data.isMiss){
      return;
    }

    const target = worldState.getDynamic(this.data.target.id, this.data.target),
      targetOrgan = worldState.getOrgan(this.data.targetOrgan.id, this.data.targetOrgan);

    targetOrgan.damage += this.data.damage;
  }
};
