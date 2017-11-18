const ViewModel = require('../../../View/ViewModel');

module.exports = class{
  constructor(
    player,
    locationRepository,
    roadRepository,
    playerRepository
  ){
    this.player = player;
    this.locationRepository = locationRepository;
    this.roadRepository = roadRepository;
    this.playerRepository = playerRepository;
  }

  async process(message, match){
    const nearbyLocations = await this.locationRepository.select('location')
      .joinRoad(this.roadRepository, 'road')
        .nearby(this.player.location)
        .build()
      .where('location.id', '!=', this.player.location);

    for(let location of this.locationRepository.hydrateAll(nearbyLocations)){
      if(match.name == location.name){
        this.player.location = location.id;
        this.playerRepository.save(this.player).then();

        this.player.events.trigger('EnterLocation', {
          location: location
        });

        return new ViewModel('in_world_state/action_state/enter_location', {
          location: location
        });
      }
    }

    return 'Вы не видите этой локации';
  }
};
