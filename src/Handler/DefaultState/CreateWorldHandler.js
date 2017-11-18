const World = require('../../Game/World/World');
const SandboxGenerator = require('../../Game/World/Generator/SandboxGenerator');
const Player = require('../../Game/Object/Dynamic/Player/Player');
const ViewModel = require('../../View/ViewModel');

module.exports = class{
  constructor(
    container,
    config,
    worldRepository,
    locationRepository,
    roadRepository,
    playerRepository,
    worldGenerator
  ){
    this.container = container;
    this.config = config;
    this.worldRepository = worldRepository;
    this.locationRepository = locationRepository;
    this.roadRepository = roadRepository;
    this.playerRepository = playerRepository;
    this.worldGenerator = worldGenerator;
  }

  async process(message, match){
    if(this.config.game.world.maxPlayers < 1){
      return 'Лимит свободных слотов для игроков в этом мире истек';
    }

    const worldsCount = await this.worldRepository.select()
        .build()
        .count('id as count');

    if(parseInt(worldsCount[0].count) + 1 > this.config.game.maxWorlds){
      return 'Лимит свободных слотов для миров истек';
    }

    const world = this.worldGenerator.generate(
      parseInt(match.seed)
    );
    await this.worldRepository.save(world);

    const locationList = await new SandboxGenerator(this.container, world).generate();

    locationList
      .locationsForEach(async (location) => {
        await this.locationRepository.save(location)
      });
    locationList
      .roadsForEach(async (road) => {
        await this.roadRepository.save(road)
      });

    const player = new Player(
      world.id,
      locationList.startLocation.id,
      message.author.username,
      message.author.id
    );
    await this.playerRepository.save(player);

    return new ViewModel('default_state/create_world', {
      world: world,
      location: locationList.startLocation,
      player: player
    });
  }
};
