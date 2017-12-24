const ViewModel = require('../../View/ViewModel');

module.exports = class{
  constructor(
    player,
    worldRepository
  ){
    this.player = player;
    this.worldRepository = worldRepository;
  }

  async process(message, match){
    const world = await this.worldRepository.find('id', this.player.world),
      chrono = await world.getChrono(),
      location = await this.player.getCurrentLocation(),
      nearbyLocations = await location.getNearbyLocations(),
      nearbyDynamics = await this.player.getNearbyDynamics(),
      nearbyItems = await location.getItems();

    return new ViewModel('in_world_state/view_location', {
      chrono: chrono,
      location: location,
      nearbyLocations: nearbyLocations,
      nearbyDynamics: nearbyDynamics,
      nearbyItems: nearbyItems
    });
  }
};
