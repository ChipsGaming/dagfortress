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
      roadRepository = await this.container.get('RoadRepository').build({}, this.container),
      playerRepository = await this.container.get('PlayerRepository').build({}, this.container);

    const nearbyLocations = await locationRepository.select('location')
      .joinRoad(roadRepository, 'road')
        .nearby(this.player.location)
        .build()
      .where('location.id', '!=', this.player.location);

    for(let location of locationRepository.hydrateAll(nearbyLocations)){
      if(match.name == location.name){
        this.player.location = location.id;
        playerRepository.save(this.player).then();

        return new ViewModel('in_world_state/enter_location', {
          location: location
        });
      }
    }

    return 'Вы не видите этой локации';
  }
};
