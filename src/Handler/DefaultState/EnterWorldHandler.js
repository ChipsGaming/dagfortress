const World = require('../../Game/World/World');
const Player = require('../../Game/Player/Player');

module.exports = class{
  constructor(container){
    this.container = container;
  }

  process(message, match){
    Promise.all([
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
        worldRepository
          .find('id', match.id)
          .then(function(world){
            if(world === null){
              return message.reply('Мир с заданым идентификатором не найден');
            }

            playerRepository.select()
              .where('world', world.id)
              .count('id as count')
              .then(function(data){
                if(parseInt(data[0].count) + 1 > config.game.world.maxPlayers){
                  return message.reply('Лимит свободных слотов для игроков в этом мире истек');
                }

                return locationRepository.select()
                  .where('world', world.id)
                  .where('isStart', true)
                  .limit(1);
              })
              .then(function(data){
                if(data.lendth == 0){
                  return message.reply('В данном мире нет стартовой локации. Вход невозможен');
                }

                const location = locationRepository.hydrate(data[0]);

                const player = new Player(message.author.id, world.id, location.id);
                playerRepository.save(player).then();

                return message.reply(`Вы вошли в мир "${world.id}", локация "${location.id}"`);
              });
          });
      });
  }
};
