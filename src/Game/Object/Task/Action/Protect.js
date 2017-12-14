const AttacksEvent = require('../../Dynamic/Event/AttacksEvent');

module.exports = class{
  constructor(
    globalEvents,
    allianceRepository,
    groupRepository,
    dynamicRepository
  ){
    this.globalEvents = globalEvents;
    this.allianceRepository = allianceRepository;
    this.groupRepository = groupRepository;
    this.dynamicRepository = dynamicRepository;
  }

  async run(dynamic, action, task, next){
    const ai = await dynamic.getAI();

    const enemy = await ai.attack.getTarget();
    if(enemy === null){
      return next(dynamic, action, task);
    }

    const weapon = await ai.attack.getWeapon(enemy),
      targetOrgan = await ai.attack.getTargetOrgan(enemy);
    if(weapon === null || targetOrgan === null){
      return next(dynamic, action, task);
    }

    const damage = await ai.attack.getDamage(weapon, enemy, targetOrgan);

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
