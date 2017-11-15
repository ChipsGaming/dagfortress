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
      this.container.get('PlayerRepository').build({}, this.container)
    ])
      .then(function([config, worldRepository, playerRepository]){
        if(config.game.world.maxPlayers < 1){
          return message.reply('Лимит свободных слотов для игроков в этом мире истек');
        }

        worldRepository.select()
          .count('id as count')
          .then(function(data){
            if(parseInt(data[0].count) + 1 > config.game.maxWorlds){
              return message.reply('Лимит свободных слотов для миров истек');
            }

            let world = new World(parseInt(match.seed));
            worldRepository.save(world).then();

            let player = new Player(message.author.id, world.id);
            playerRepository.save(player).then();

            return message.reply(`Мир успешно создан "${world.id}"`);
          });
      });
  }
};
