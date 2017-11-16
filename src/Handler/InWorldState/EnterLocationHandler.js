const ViewModel = require('../../View/ViewModel');

module.exports = class{
  constructor(container, player){
    this.container = container;
    this.player = player;
  }

  process(message, match){
    return Promise.all([
      this.container.get('Config').build({}, this.container),
      this.container.get('LocationRepository').build({}, this.container),
      this.container.get('RoadRepository').build({}, this.container),
      this.container.get('PlayerRepository').build({}, this.container)
    ])
      .then(function([
        config,
        locationRepository,
        roadRepository,
        playerRepository
      ]){
        return locationRepository.select('location')
          .joinRoad(roadRepository, 'road')
            .nearby(this.player.location)
            .build()
          .where('location.id', '!=', this.player.location)
          .then(function(data){
            for(let location of locationRepository.hydrateAll(data)){
              if(match.id == location.id){
                this.player.location = location.id;
                playerRepository.save(this.player).then();

                return new ViewModel('in_world_state/enter_location', {
                  location: location
                });
              }
            }

            return 'Вы не видите этой локации';
          }.bind(this));
      }.bind(this));
  }
};
