const World = require('../../Game/World/World');
const Player = require('../../Game/Player/Player');

module.exports = class{
  constructor(container, player){
    this.container = container;
    this.player = player;
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
        playerRepository.remove(this.player)
          .then(function(count){
            message.reply(`Выход выполнен`);

            return playerRepository.select()
              .where('world', this.player.world)
              .count('id as count')
          }.bind(this))
          .then(function(data){
            if(parseInt(data[0].count) == 0){
              worldRepository.find('id', this.player.world)
                .then(function(world){
                  locationRepository.database
                    .delete()
                    .from(locationRepository.tableName)
                    .where('world', world.id)
                    .then();
                  worldRepository.remove(world).then();
                });
            }
          }.bind(this));
      }.bind(this));
  }
};
