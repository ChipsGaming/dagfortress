const World = require('../../Game/World/World');
const SandboxGenerator = require('../../Game/World/Generator/SandboxGenerator');
const Player = require('../../Game/Player/Player');
const ViewModel = require('../../View/ViewModel');

module.exports = class{
  constructor(container){
    this.container = container;
  }

  process(message, match){
    return Promise.all([
      this.container.get('Config').build({}, this.container),
      this.container.get('WorldRepository').build({}, this.container),
      this.container.get('LocationRepository').build({}, this.container),
      this.container.get('RoadRepository').build({}, this.container),
      this.container.get('PlayerRepository').build({}, this.container)
    ])
      .then(function([
        config,
        worldRepository,
        locationRepository,
        roadRepository,
        playerRepository
      ]){
        if(config.game.world.maxPlayers < 1){
          return 'Лимит свободных слотов для игроков в этом мире истек';
        }

        return worldRepository.select()
          .build()
          .count('id as count')
          .then(function(data){
            if(parseInt(data[0].count) + 1 > config.game.maxWorlds){
              return 'Лимит свободных слотов для миров истек';
            }

            const world = new World(parseInt(match.seed));
            worldRepository.save(world).then();

            const locationList = new SandboxGenerator(this.container, world)
              .generate();
            locationList
              .locationsForEach((location) => { locationRepository.save(location).then() });
            locationList
              .roadsForEach((road) => { roadRepository.save(road).then() });

            const player = new Player(
              message.author.id,
              world.id,
              locationList.startLocation.id
            );
            playerRepository.save(player).then();

            return new ViewModel('default_state/create_world', {
              world: world,
              player: player
            });
          }.bind(this));
      }.bind(this));
  }
};
