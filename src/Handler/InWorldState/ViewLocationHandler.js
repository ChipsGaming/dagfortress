const ViewModel = require('../../View/ViewModel');

module.exports = class{
  constructor(
    player,
    worldRepository,
    locationRepository,
    roadRepository,
    playerRepository
  ){
    this.player = player;
    this.worldRepository = worldRepository;
    this.locationRepository = locationRepository;
    this.roadRepository = roadRepository;
    this.playerRepository = playerRepository;
  }

  async process(message, match){
    const world = await this.worldRepository.find('id', this.player.world),
      location = await this.locationRepository.find('id', this.player.location);

    const nearbyLocations = await this.locationRepository.select('location')
        .joinRoad(this.roadRepository, 'road')
        .nearby(this.player.location)
        .build()
        .where('location.id', '!=', this.player.location)

    const nearbyPlayers = await this.playerRepository.select()
      .build()
      .where('object.location', '=', this.player.location)
      .where('object.id', '!=', this.player.id);

    return new ViewModel('in_world_state/view_location', {
      world: world,
      location: location,
      nearbyLocations: nearbyLocations,
      nearbyPlayers: nearbyPlayers
    });
  }
};
