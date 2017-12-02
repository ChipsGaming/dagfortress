const World = require('../../Game/World/World');
const Player = require('../../Game/Object/Dynamic/Player/Player');
const SandboxOrganGenerator = require('../../Game/Object/Dynamic/Generator/SandboxOrganGenerator');
const ViewModel = require('../../View/ViewModel');

module.exports = class{
  constructor(
    config,
    worldRepository,
    locationRepository,
    allianceRepository,
    groupRepository,
    playerRepository,
    organRepository
  ){
    this.config = config;
    this.worldRepository = worldRepository;
    this.locationRepository = locationRepository;
    this.allianceRepository = allianceRepository;
    this.groupRepository = groupRepository;
    this.playerRepository = playerRepository;
    this.organRepository = organRepository;
  }

  async process(message, match){
    const world = await this.worldRepository.find('id', match.id);
    if(world === null){
      return 'Мир с заданым идентификатором не найден';
    }

    const playersCount = await world.getPlayersCount(this.playerRepository);
    if(playersCount + 1 > this.config.game.world.maxPlayers){
      return 'Лимит свободных слотов для игроков в этом мире истек';
    }

    const startLocation = await world.getStartLocation(this.locationRepository);
    if(startLocation === null){
      return 'В данном мире нет стартовой локации. Вход невозможен';
    }

    const playerGroup = await world.getPlayerGroup(
      this.groupRepository,
      this.allianceRepository
    );
    if(playerGroup === null){
      return 'В данном мире нет клана для игроков. Вход невозможен';
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
