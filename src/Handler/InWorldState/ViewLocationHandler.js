const ViewModel = require('../../View/ViewModel');

module.exports = class{
  constructor(
    player,
    worldRepository,
    locationRepository,
    roadRepository,
    dynamicRepository,
    playerRepository
  ){
    this.player = player;
    this.worldRepository = worldRepository;
    this.locationRepository = locationRepository;
    this.roadRepository = roadRepository;
    this.dynamicRepository = dynamicRepository;
    this.playerRepository = playerRepository;
  }

  async process(message, match){
    const world = await this.worldRepository.find('id', this.player.world),
      location = await this.locationRepository.find('id', this.player.location);

    const nearbyLocations = await this.locationRepository.select()
        .nearby(this.roadRepository, this.player.location)
        .build();

    const nearbyDynamics = await this.dynamicRepository.select()
      .nearby(this.player)
      .build();

    return new ViewModel('in_world_state/view_location', {
      location: location,
      nearbyLocations: nearbyLocations,
      nearbyDynamics: nearbyDynamics
    });
  }
};
