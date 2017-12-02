module.exports = class{
  constructor(
    aiContainer,
    allianceRepository,
    groupRepository,
    dynamicRepository
  ){
    this.aiContainer = aiContainer;
    this.allianceRepository = allianceRepository;
    this.groupRepository = groupRepository;
    this.dynamicRepository = dynamicRepository;
  }

  async run(dynamic, action, task, next){
    const group = await dynamic.getGroup(this.groupRepository);
    if(group === null){
      return next(dynamic, action, task);
    }

    const enemy = await this.dynamicRepository.findWith(
      this.dynamicRepository.select()
        .inLocation(dynamic.location)
        .alive()
        .enemies(
          group.alliance,
          this.groupRepository,
          this.allianceRepository
        )
    );
    if(enemy === null){
      return next(dynamic, action, task);
    }

    const ai = await dynamic.getAI(this.aiContainer),
      weapon = await ai.attack.getWeapon(enemy),
      targetOrgan = await ai.attack.getTargetOrgan(enemy);
    if(weapon === null || targetOrgan === null){
      return next(dynamic, action, task);
    }

    dynamic.attack(
      weapon,
      enemy,
      targetOrgan
    );
  }
};
