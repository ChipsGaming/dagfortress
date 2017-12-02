const GameEvent = require('../../../Event/GameEvent');

module.exports = class extends GameEvent{
  constructor(publisher, location){
    super('Move', publisher, {
      location: location
    });
  }

  apply(worldState){
    const dynamic = worldState.getDynamic(this.publisher.id, this.publisher);

    dynamic.location = this.data.location.id;
  }
};
