const World = require('../../Game/World/World');
const Player = require('../../Game/Object/Dynamic/Player/Player');
const ViewModel = require('../../View/ViewModel');

module.exports = class{
  constructor(
    config,
    worldRepository,
    locationRepository,
    playerRepository
  ){
    this.config = config;
    this.worldRepository = worldRepository;
    this.locationRepository = locationRepository;
    this.playerRepository = playerRepository;
  }

  async process(message, match){
    const world = await this.worldRepository
      .find('name', match.name);

    if(world === null){
      return 'Мир с заданым идентификатором не найден';
    }

    const playersCount = await this.playerRepository.select()
      .build()
      .where('world', world.id)
      .count('player.id as count');

    if(parseInt(playersCount[0].count) + 1 > this.config.game.world.maxPlayers){
      return 'Лимит свободных слотов для игроков в этом мире истек';
    }

    const startLocation = await this.locationRepository.find({
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
    await this.playerRepository.save(player);

    return new ViewModel('default_state/enter_world', {
      world: world,
      location: startLocation
    });
  }
};
