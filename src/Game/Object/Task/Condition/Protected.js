module.exports = class{
  constructor(
    allianceRepository,
    groupRepository,
    locationRepository,
    dynamicRepository
  ){
    this.allianceRepository = allianceRepository;
    this.groupRepository = groupRepository;
    this.locationRepository = locationRepository;
    this.dynamicRepository = dynamicRepository;
  }

  async check(task, condition, view){
    const alliance = await (await task.getGroup()).getAlliance();

    const group = await this.groupRepository.find('id', task.group);
    if(group === null){
      return true;
    }

    const location = await this.locationRepository.findWith(
      this.locationRepository.select()
        .inWorld(alliance.world)
        .withName(condition.target.location)
    );
    if(location === null){
      return true;
    }

    const enemiesInLocationCount = await this.dynamicRepository.getScalar(
      this.dynamicRepository.select()
        .enemies(
          group.alliance,
          this.groupRepository,
          this.allianceRepository
        )
        .alive()
        .inLocation(location)
        .count()
    );

    return enemiesInLocationCount == 0;
  }
};
