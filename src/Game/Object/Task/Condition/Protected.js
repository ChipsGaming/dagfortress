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
    const group = await this.groupRepository.find('id', task.group),
      location = await this.locationRepository.find('name', condition.target.location);
    if(group === null){
      return true;
    }
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
