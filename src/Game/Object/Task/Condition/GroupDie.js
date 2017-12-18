module.exports = class{
  constructor(
    allianceRepository,
    groupRepository,
    dynamicRepository
  ){
    this.allianceRepository = allianceRepository;
    this.groupRepository = groupRepository;
    this.dynamicRepository = dynamicRepository;
  }

  async check(task, condition, view){
    const alliance = await (await task.getGroup()).getAlliance();
    
    const group = await this.groupRepository.findWith(
      this.groupRepository.select()
        .inWorld(alliance.world, this.allianceRepository)
        .withName(condition.target.group)
    );
    if(group === null){
      return true;
    }

    const aliveDynamicsCount = await this.dynamicRepository.getScalar(
      this.dynamicRepository.select()
        .inGroup(group)
        .alive()
        .count()
    );

    return aliveDynamicsCount < 1;
  }
};
