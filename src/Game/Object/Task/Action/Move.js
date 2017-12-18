const UG = require('ug'),
  MoveEvent = require('../../Dynamic/Event/MoveEvent');

module.exports = class{
  constructor(
    globalEvents,
    locationRepository
  ){
    this.globalEvents = globalEvents;
    this.locationRepository = locationRepository;
  }

  async run(dynamic, action, task, next){
    const group = await task.getGroup(),
      alliance = await group.getAlliance();

    const targetLocation = await this.locationRepository.findWith(
      this.locationRepository.select()
        .inWorld(alliance.world)
        .withName(action.target.location)
    );
    if(targetLocation === null || dynamic.location == targetLocation.id){
      return next(dynamic, action, task);
    }

    const ai = await group.getAI(),
      nextLocation = await ai.getNextLocation(dynamic, targetLocation);
    if(nextLocation === null){
      return next(dynamic, action, task);
    }

    this.globalEvents.trigger(new MoveEvent(
      dynamic,
      nextLocation
    ));
  }
};
