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

    const playersCount = await this.playerRepository.select()
      .inWorld(world)
      .build()
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

    let playerGroup = await this.groupRepository.select()
      .inWorld(this.allianceRepository, world)
      .forPlayer()
      .build()
      .limit(1);
    if(playerGroup.length < 1){
      return 'В данном мире нет клана для игроков. Вход невозможен';
    }
    playerGroup = this.groupRepository.constructor.hydrate(playerGroup[0]);

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
