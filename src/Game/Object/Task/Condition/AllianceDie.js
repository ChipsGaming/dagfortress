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
    const world = await (await (await task.getGroup()).getAlliance()).getWorld();

    const alliance = await this.allianceRepository.findWith(
      this.allianceRepository.select()
        .inWorld(world)
        .withName(condition.target.alliance)
    );
    if(alliance === null){
      return true;
    }

    const aliveDynamicsCount = await this.dynamicRepository.getScalar(
      this.dynamicRepository.select()
        .inAlliance(alliance, this.groupRepository)
        .alive()
        .count()
    );

    return aliveDynamicsCount < 1;
  }
};
