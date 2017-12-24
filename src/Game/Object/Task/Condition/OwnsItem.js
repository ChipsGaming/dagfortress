module.exports = class{
  constructor(
    locationRepository,
    itemRepository
  ){
    this.locationRepository = locationRepository;
    this.itemRepository = itemRepository;
  }

  async check(task, condition, view){
    const group = await task.getGroup(),
      alliance = await group.getAlliance();

    const item = await this.itemRepository.findWith(
      this.itemRepository.select()
        .inWorld(alliance.world, this.locationRepository)
        .withName(condition.target.item)
    );
    if(item === null){
      return false;
    }
    if(item.owner === null){
      return false;
    }

    const owner = await item.getOwner();

    return owner.group == group.id;
  }
};
