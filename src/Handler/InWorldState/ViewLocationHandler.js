const ViewModel = require('../../View/ViewModel');

module.exports = class{
  constructor(container, player){
    this.container = container;
    this.player = player;
  }

  async process(message, match){
    const config = await this.container.get('Config').build({}, this.container),
      worldRepository = await this.container.get('WorldRepository').build({}, this.container),
      locationRepository = await this.container.get('LocationRepository').build({}, this.container),
      roadRepository = await this.container.get('RoadRepository').build({}, this.container);

    const world = await worldRepository.find('id', this.player.world),
      location = await locationRepository.find('id', this.player.location),
      nearbyLocations = await locationRepository.select('location')
        .joinRoad(roadRepository, 'road')
        .nearby(this.player.location)
        .build()
        .where('location.id', '!=', this.player.location)

    return new ViewModel('in_world_state/view_location', {
      world: world,
      location: location,
      nearbyLocations: nearbyLocations
    });
  }
};
