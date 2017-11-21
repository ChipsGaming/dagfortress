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
    const nearbyLocations = await this.locationRepository.select()
      .nearby(this.roadRepository, this.player.location)
      .build();

    for(let location of this.locationRepository.hydrateAll(nearbyLocations)){
      if(match.name == location.name){
        this.player.location = location.id;
        this.player.currentEndurance--;

        this.player.events.trigger('EnterLocation', {
          location: location
        });

        await this.playerRepository.save(this.player);

        const nearbyLocations = await this.locationRepository.select()
            .nearby(this.roadRepository, this.player.location)
            .build();

        const nearbyDynamics = await this.dynamicRepository.select()
          .nearby(this.player)
          .build();

        return new ViewModel('in_world_state/action_state/enter_location', {
          location: location,
          nearbyLocations: nearbyLocations,
          nearbyDynamics: nearbyDynamics
        });
      }
    }

    return 'Вы не видите этой локации';
  }
};
