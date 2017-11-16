const ViewModel = require('../../View/ViewModel');

module.exports = class{
  constructor(container, player){
    this.container = container;
    this.player = player;
  }

  process(message, match){
    return Promise.all([
      this.container.get('Config').build({}, this.container),
      this.container.get('WorldRepository').build({}, this.container),
      this.container.get('LocationRepository').build({}, this.container),
      this.container.get('RoadRepository').build({}, this.container)
    ])
      .then(function([
        config,
        worldRepository,
        locationRepository,
        roadRepository
      ]){
        return Promise.all([
          worldRepository.find('id', this.player.world),
          locationRepository.find('id', this.player.location),
          locationRepository.select('location')
            .joinRoad(roadRepository, 'road')
            .nearby(this.player.location)
            .build()
          .where('location.id', '!=', this.player.location)
        ])
          .then(function([world, location, nearbyLocations]){
            return new ViewModel('in_world_state/view_location', {
              world: world,
              location: location,
              nearbyLocations: nearbyLocations
            });
          });
      }.bind(this));
  }
};
