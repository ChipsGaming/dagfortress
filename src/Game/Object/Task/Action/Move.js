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
    const targetLocation = await this.locationRepository.find('name', action.target.location);
    if(targetLocation === null || dynamic.location == targetLocation.id){
      return next(dynamic, action, task);
    }

    const ai = await dynamic.getAI(),
      nextLocation = await ai.move.getNextLocation(targetLocation);
    if(nextLocation === null){
      return next(dynamic, action, task);
    }

    this.globalEvents.trigger(new MoveEvent(
      dynamic,
      nextLocation
    ));
  }
};
