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
      chrono = await this.chronoRepository.find('world', world.id),
      location = await this.locationRepository.find('id', this.player.location);

    const nearbyLocations = await this.locationRepository.fetchAll(
      this.locationRepository.select()
        .nearby(this.roadRepository, this.player.location)
    );

    const nearbyDynamics = await this.dynamicRepository.fetchAll(
      this.dynamicRepository.select()
        .nearby(this.player)
    );

    return new ViewModel('in_world_state/view_location', {
      chrono: chrono,
      location: location,
      nearbyLocations: nearbyLocations,
      nearbyDynamics: nearbyDynamics
    });
  }
};
