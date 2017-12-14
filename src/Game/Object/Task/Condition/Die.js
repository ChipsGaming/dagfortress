module.exports = class{
  constructor(
    dynamicRepository
  ){
    this.dynamicRepository = dynamicRepository;
  }

  async check(task, condition, view){
    const dynamic = await this.dynamicRepository.find('name', condition.target.dynamic);
    if(dynamic === null){
      return true;
    }

    return dynamic.isDie;
  }
};
