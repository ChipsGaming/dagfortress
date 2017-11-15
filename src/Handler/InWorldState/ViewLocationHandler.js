module.exports = class{
  constructor(container, player){
    this.container = container;
    this.player = player;
  }

  process(message, match){
    Promise.all([
      this.container.get('Config').build({}, this.container),
      this.container.get('WorldRepository').build({}, this.container),
      this.container.get('LocationRepository').build({}, this.container)
    ])
      .then(function([
        config,
        worldRepository,
        locationRepository
      ]){
        return Promise.all([
          worldRepository.find('id', this.player.world),
          locationRepository.find('id', this.player.location)
        ])
      }.bind(this))
      .then(function([world, location]){
        message.reply(`Вы стоите в локации "${location.id}" мира "${world.id}"`);
      });
  }
};
