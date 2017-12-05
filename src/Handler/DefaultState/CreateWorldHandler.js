const World = require('../../Game/World/World'),
  WorldBuilder = require('../../Game/Builder/WorldBuilder'),
  SandboxOrganGenerator = require('../../Game/Object/Dynamic/Generator/SandboxOrganGenerator'),
  Player = require('../../Game/Object/Dynamic/Player/Player'),
  ViewModel = require('../../View/ViewModel'),
  PresetViewModel = require('../../View/PresetViewModel');

module.exports = class{
  constructor(
    config,
    prototypeList,
    worldRepository,
    chronoRepository,
    allianceRepository,
    groupRepository,
    taskRepository,
    taskConditionRepository,
    taskActionRepository,
    taskRewardRepository,
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
    this.taskConditionRepository = taskConditionRepository;
    this.taskActionRepository = taskActionRepository;
    this.taskRewardRepository = taskRewardRepository;
    this.locationRepository = locationRepository;
    this.roadRepository = roadRepository;
    this.dynamicRepository = dynamicRepository;
    this.organRepository = organRepository;
    this.playerRepository = playerRepository;
  }

  async process(message, match){
    const worldsCount = await this.worldRepository.getScalar(
      this.worldRepository.select()
        .count()
    );
    if(worldsCount + 1 > this.config.game.maxWorlds){
      return new PresetViewModel('Лимит свободных слотов для миров истек');
    }

    const prototype = await this.prototypeList.get(match.name);
    if(prototype === null){
      return new PresetViewModel('Прототип не найден');
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
    for(const taskCondition of worldBuilder.tasksConditions){
      await this.taskConditionRepository.save(taskCondition);
    }
    for(const taskAction of worldBuilder.tasksActions){
      await this.taskActionRepository.save(taskAction);
    }
    for(const taskReward of worldBuilder.tasksRewards){
      await this.taskRewardRepository.save(taskReward);
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
    player.isCreator = true;
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
