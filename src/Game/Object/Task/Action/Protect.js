const AttacksEvent = require('../../Dynamic/Event/AttacksEvent');

module.exports = class{
  constructor(
    globalEvents
  ){
    this.globalEvents = globalEvents;
  }

  async run(dynamic, action, task, next){
    const ai = await (await dynamic.getGroup()).getAI();

    const enemy = await ai.getTarget(dynamic);
    if(enemy === null){
      return next(dynamic, action, task);
    }

    const weapon = await ai.getWeapon(dynamic, enemy),
      targetOrgan = await ai.getTargetOrgan(dynamic, enemy);
    if(weapon === null || targetOrgan === null){
      return next(dynamic, action, task);
    }

    const damage = await ai.getDamage(dynamic, weapon, enemy, targetOrgan);

    this.globalEvents.trigger(new AttacksEvent(
      dynamic,
      weapon,
      enemy,
      targetOrgan,
      damage,
      damage === 0
    ));
  }
};
