const ViewModel = require('../../View/ViewModel');

module.exports = class{
  constructor(
    player,
    worldRepository,
    chronoRepository,
    locationRepository,
    roadRepository,
    dynamicRepository,
    playerRepository
  ){
    this.player = player;
    this.worldRepository = worldRepository;
    this.chronoRepository = chronoRepository;
    this.locationRepository = locationRepository;
    this.roadRepository = roadRepository;
    this.dynamicRepository = dynamicRepository;
    this.playerRepository = playerRepository;
  }

  async process(message, match){
    const world = await this.worldRepository.find('id', this.player.world),
      chrono = await world.getChrono(this.chronoRepository),
      location = await this.player.getCurrentLocation(this.locationRepository),
      nearbyLocations = await location.getNearbyLocations(
        this.locationRepository,
        this.roadRepository
      ),
      nearbyDynamics = await this.player.getNearbyDynamics(this.dynamicRepository);

    return new ViewModel('in_world_state/view_location', {
      chrono: chrono,
      location: location,
      nearbyLocations: nearbyLocations,
      nearbyDynamics: nearbyDynamics
    });
  }
};
