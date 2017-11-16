const World = require('../../Game/World/World');
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
      this.container.get('PlayerRepository').build({}, this.container)
    ])
      .then(function([
        config,
        worldRepository,
        locationRepository,
        playerRepository
      ]){
        return worldRepository
          .find('name', match.name)
          .then(function(world){
            if(world === null){
              return 'Мир с заданым идентификатором не найден';
            }

            return playerRepository.select()
              .build()
              .where('world', world.id)
              .count('id as count')
              .then(function(data){
                if(parseInt(data[0].count) + 1 > config.game.world.maxPlayers){
                  return 'Лимит свободных слотов для игроков в этом мире истек';
                }

                return locationRepository.select()
                  .build()
                  .where('world', world.id)
                  .where('isStart', true)
                  .limit(1);
              })
              .then(function(data){
                if(data.lendth == 0){
                  return 'В данном мире нет стартовой локации. Вход невозможен';
                }

                const location = locationRepository.hydrate(data[0]);

                const player = new Player(message.author.id, world.id, location.id);
                playerRepository.save(player).then();

                return new ViewModel('default_state/enter_world', {
                  world: world,
                  location: location
                });
              });
          });
      });
  }
};
