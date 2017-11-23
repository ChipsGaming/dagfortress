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

  async check(task){
    return false;
  }

  async run(dynamic, task){
    const target = await this.dynamicRepository.findWith(
      this.dynamicRepository.select()
        .inLocation(dynamic.location)
        .alive()
        .enemies(
          await this.groupRepository.find('id', dynamic.group),
          this.groupRepository,
          this.allianceRepository
        )
    );
    if(target === null){
      dynamic.currentEndurance = 0;
    }

    const ai = await dynamic.getAI(this.aiContainer),
      weapon = await ai.attack.getWeapon(target),
      targetOrgan = await ai.attack.getTargetOrgan(target);

    if(weapon === null || targetOrgan === null){
      dynamic.currentEndurance = 0;
      return;
    }

    dynamic.attack(
      weapon,
      target,
      targetOrgan
    );
  }
};
