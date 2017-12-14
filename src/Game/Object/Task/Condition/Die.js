module.exports = class{
  constructor(
    dynamicRepository
  ){
    this.dynamicRepository = dynamicRepository;
  }

  async check(task, condition, view){
    const alliance = await (await task.getGroup()).getAlliance();

    const dynamic = await this.dynamicRepository.findWith(
      this.dynamicRepository.select()
        .inWorld(alliance.world)
        .withName(condition.target.dynamic)
    );
    if(dynamic === null){
      return true;
    }

    return dynamic.isDie;
  }
};
