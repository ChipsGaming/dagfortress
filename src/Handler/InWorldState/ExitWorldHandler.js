module.exports = class{
  constructor(container, player){
    this.container = container;
    this.player = player;
  }

  process(message, match){
    return Promise.all([
      this.container.get('Config').build({}, this.container),
      this.container.get('WorldRepository').build({}, this.container),
      this.container.get('PlayerRepository').build({}, this.container)
    ])
      .then(function([
        config,
        worldRepository,
        playerRepository
      ]){
        return playerRepository.remove(this.player)
          .then(function(count){
            message.reply('Выход выполнен');

            return playerRepository.select()
              .build()
              .where('world', this.player.world)
              .count('id as count')
          }.bind(this))
          .then(function(data){
            if(parseInt(data[0].count) != 0){
              return;
            }

            return worldRepository.find('id', this.player.world)
              .then(function(world){
                return worldRepository.remove(world).then();
              });
          }.bind(this));
      }.bind(this));
  }
};
