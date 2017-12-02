module.exports = class{
  constructor(
    locationRepository,
    dynamicRepository
  ){
    this.locationRepository = locationRepository;
    this.dynamicRepository = dynamicRepository;
  }

  async check(task, condition){
    const location = await this.locationRepository.find('name', condition.target.location);
    if(location === null){
      return true;
    }

    const alliesOutLocationCount = await this.dynamicRepository.getScalar(
      this.dynamicRepository.select()
        .inGroup(task.group)
        .alive()
        .outLocation(location)
        .count()
    );

    return alliesOutLocationCount == 0;
  }
};
