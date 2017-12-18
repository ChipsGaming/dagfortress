const World = require('../../Game/World/World'),
  Player = require('../../Game/Object/Dynamic/Player/Player'),
  SandboxOrganGenerator = require('../../Game/Object/Dynamic/Generator/SandboxOrganGenerator'),
  ViewModel = require('../../View/ViewModel'),
  PresetViewModel = require('../../View/PresetViewModel');

module.exports = class{
  constructor(
    config,
    worldRepository,
    allianceRepository,
    groupRepository,
    playerRepository,
    organRepository
  ){
    this.config = config;
    this.worldRepository = worldRepository;
    this.allianceRepository = allianceRepository;
    this.groupRepository = groupRepository;
    this.playerRepository = playerRepository;
    this.organRepository = organRepository;
  }

  async process(message, match){
    const world = await this.worldRepository.find('id', match.id);
    if(world === null){
      return new PresetViewModel('Мир с заданым идентификатором не найден');
    }

    const group = await this.groupRepository.findWith(
      this.groupRepository.select()
        .inWorld(world, this.allianceRepository)
        .withName(match.group)
    );
    if(group === null){
      return new PresetViewModel('Группа не найдена');
    }
    if(!group.isPlayer){
      return new PresetViewModel(`В группу ${group.name} не могут входить игроки`);
    }
    if(group.maxPlayers !== null){
      const playersCount = await group.getPlayersCount();
      if(playersCount + 1 > group.maxPlayers){
        return new PresetViewModel('Лимит свободных слотов для игроков в этой группе истек');
      }
    }
    if(group.startLocation === null){
      return new PresetViewModel(`Группе ${group.name} не задана стартовая локация`);
    }

    const startLocation = await group.getStartLocation();

    const player = new Player(
      world.id,
      startLocation.id,
      group.id,
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
