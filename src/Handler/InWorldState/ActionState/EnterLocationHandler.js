const ViewModel = require('../../../View/ViewModel');

module.exports = class{
  constructor(
    player,
    locationRepository,
    roadRepository,
    dynamicRepository,
    playerRepository
  ){
    this.player = player;
    this.locationRepository = locationRepository;
    this.roadRepository = roadRepository;
    this.dynamicRepository = dynamicRepository;
    this.playerRepository = playerRepository;
  }

  async process(message, match){
    const location = await this.locationRepository.findWith(
      this.locationRepository.select()
        .withName(match.name)
        .nearby(this.roadRepository, this.player.location)
    );
    if(location === null){
      return 'Вы не видите этой локации';
    }

    this.player.move(location);
    await this.playerRepository.save(this.player);

    const nearbyLocations = await this.locationRepository.fetchAll(
      this.locationRepository.select()
        .nearby(this.roadRepository, this.player.location)
    );

    const nearbyDynamics = await this.dynamicRepository.fetchAll(
      this.dynamicRepository.select()
        .nearby(this.player)
    );

    return new ViewModel('in_world_state/action_state/enter_location', {
      location: location,
      nearbyLocations: nearbyLocations,
      nearbyDynamics: nearbyDynamics
    });
  }
};
