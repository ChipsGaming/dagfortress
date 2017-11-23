const World = require('../../Game/World/World');
const WorldBuilder = require('../../Game/Builder/WorldBuilder');
const SandboxOrganGenerator = require('../../Game/Object/Dynamic/Generator/SandboxOrganGenerator');
const Player = require('../../Game/Object/Dynamic/Player/Player');
const ViewModel = require('../../View/ViewModel');

module.exports = class{
  constructor(
    config,
    prototypeList,
    worldRepository,
    chronoRepository,
    allianceRepository,
    groupRepository,
    taskRepository,
    locationRepository,
    roadRepository,
    dynamicRepository,
    organRepository,
    playerRepository
  ){
    this.config = config;
    this.prototypeList = prototypeList;
    this.worldRepository = worldRepository;
    this.chronoRepository = chronoRepository;
    this.allianceRepository = allianceRepository;
    this.groupRepository = groupRepository;
    this.taskRepository = taskRepository;
    this.locationRepository = locationRepository;
    this.roadRepository = roadRepository;
    this.dynamicRepository = dynamicRepository;
    this.organRepository = organRepository;
    this.playerRepository = playerRepository;
  }

  async process(message, match){
    if(this.config.game.world.maxPlayers < 1){
      return 'Лимит свободных слотов для игроков в этом мире истек';
    }

    const worldsCount = await this.worldRepository.getScalar(
      this.worldRepository.select()
        .count()
    );
    if(worldsCount + 1 > this.config.game.maxWorlds){
      return 'Лимит свободных слотов для миров истек';
    }

    const prototype = await this.prototypeList.get(match.name);
    if(prototype === null){
      return 'Прототип не найден';
    }

    const worldBuilder = WorldBuilder.fromJson(prototype);

    await this.worldRepository.save(worldBuilder.world);
    await this.chronoRepository.save(worldBuilder.chrono);
    for(const alliance of worldBuilder.alliances){
      await this.allianceRepository.save(alliance);
    }
    for(const group of worldBuilder.groups){
      await this.groupRepository.save(group);
    }
    for(const task of worldBuilder.tasks){
      await this.taskRepository.save(task);
    }
    for(const location of worldBuilder.locations){
      await this.locationRepository.save(location);
    }
    for(const road of worldBuilder.roads){
      await this.roadRepository.save(road);
    }
    for(const dynamic of worldBuilder.dynamics){
      await this.dynamicRepository.save(dynamic);
    }
    for(const organ of worldBuilder.organs){
      await this.organRepository.save(organ);
    }

    const player = new Player(
      worldBuilder.world.id,
      worldBuilder.findStartLocation().id,
      worldBuilder.findGroupPlayer().id,
      message.author.username,
      message.author.id
    );
    await this.playerRepository.save(player);
    
    for(const organ of await new SandboxOrganGenerator(player.id).generate()){
      await this.organRepository.save(organ);
    }
    
    return new ViewModel('default_state/create_world', {
      world: worldBuilder.world,
      location: worldBuilder.findStartLocation(),
      player: player
    });
  }
};
