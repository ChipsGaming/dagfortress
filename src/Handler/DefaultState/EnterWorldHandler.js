const World = require('../../Game/World/World'),
  Player = require('../../Game/Object/Dynamic/Player/Player'),
  SandboxOrganGenerator = require('../../Game/Object/Dynamic/Generator/SandboxOrganGenerator'),
  ViewModel = require('../../View/ViewModel'),
  PresetViewModel = require('../../View/PresetViewModel');

module.exports = class{
  constructor(
    config,
    worldRepository,
    playerRepository,
    organRepository
  ){
    this.config = config;
    this.worldRepository = worldRepository;
    this.playerRepository = playerRepository;
    this.organRepository = organRepository;
  }

  async process(message, match){
    const world = await this.worldRepository.find('id', match.id);
    if(world === null){
      return new PresetViewModel('Мир с заданым идентификатором не найден');
    }

    const playersCount = await world.getPlayersCount();
    if(playersCount + 1 > this.config.game.world.maxPlayers){
      return new PresetViewModel('Лимит свободных слотов для игроков в этом мире истек');
    }

    const startLocation = await world.getStartLocation();
    if(startLocation === null){
      return new PresetViewModel('В данном мире нет стартовой локации. Вход невозможен');
    }

    const playerGroup = await world.getPlayerGroup();
    if(playerGroup === null){
      return new PresetViewModel('В данном мире нет клана для игроков. Вход невозможен');
    }

    const player = new Player(
      world.id,
      startLocation.id,
      playerGroup.id,
      message.author.username,
      message.author.id
    );
    await this.playerRepository.save(player);

    for(const organ of await new SandboxOrganGenerator(player.id).generate()){
      await this.organRepository.save(organ);
    }

    return new ViewModel('default_state/enter_world', {
      world: world,
      location: startLocation
    });
  }
};
