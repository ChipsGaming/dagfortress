const World = require('../../Game/World/World');
const Player = require('../../Game/Object/Dynamic/Player/Player');
const ViewModel = require('../../View/ViewModel');

module.exports = class{
  constructor(container){
    this.container = container;
  }

  async process(message, match){
    const config = await this.container.get('Config').build({}, this.container),
      worldRepository = await this.container.get('WorldRepository').build({}, this.container),
      locationRepository = await this.container.get('LocationRepository').build({}, this.container),
      roadRepository = await this.container.get('RoadRepository').build({}, this.container),
      playerRepository = await this.container.get('PlayerRepository').build({}, this.container);

    const world = await worldRepository
      .find('name', match.name);

    if(world === null){
      return 'Мир с заданым идентификатором не найден';
    }

    const playersCount = await playerRepository.select()
      .build()
      .where('world', world.id)
      .count('player.id as count');

    if(parseInt(playersCount[0].count) + 1 > config.game.world.maxPlayers){
      return 'Лимит свободных слотов для игроков в этом мире истек';
    }

    const startLocation = await locationRepository.find({
      world: world.id,
      isStart: true
    });

    if(startLocation === null){
      return 'В данном мире нет стартовой локации. Вход невозможен';
    }

    const player = new Player(
      world.id,
      startLocation.id,
      message.author.username,
      message.author.id
    );
    await playerRepository.save(player);

    return new ViewModel('default_state/enter_world', {
      world: world,
      location: startLocation
    });
  }
};
