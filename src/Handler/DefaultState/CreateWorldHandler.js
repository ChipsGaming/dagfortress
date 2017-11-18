const World = require('../../Game/World/World');
const SandboxGenerator = require('../../Game/World/Generator/SandboxGenerator');
const Player = require('../../Game/Object/Dynamic/Player/Player');
const ViewModel = require('../../View/ViewModel');

module.exports = class{
  constructor(container){
    this.container = container;
  }

  async process(message, match){
    const config = await this.container.get('Config').build({}, this.container);
    if(config.game.world.maxPlayers < 1){
      return 'Лимит свободных слотов для игроков в этом мире истек';
    }

    const worldRepository = await this.container.get('WorldRepository').build({}, this.container),
      locationRepository = await this.container.get('LocationRepository').build({}, this.container),
      roadRepository = await this.container.get('RoadRepository').build({}, this.container),
      playerRepository = await this.container.get('PlayerRepository').build({}, this.container),
      worldGenerator = await this.container.get('WorldGenerator').build({}, this.container);

    const worldsCount = await worldRepository.select()
        .build()
        .count('id as count');

    if(parseInt(worldsCount[0].count) + 1 > config.game.maxWorlds){
      return 'Лимит свободных слотов для миров истек';
    }

    const world = worldGenerator.generate(parseInt(match.seed));
    await worldRepository.save(world);

    const locationList = await new SandboxGenerator(this.container, world).generate();

    locationList
      .locationsForEach(async (location) => {
        await locationRepository.save(location)
      });
    locationList
      .roadsForEach(async (road) => {
        await roadRepository.save(road)
      });

    const player = new Player(
      world.id,
      locationList.startLocation.id,
      message.author.username,
      message.author.id
    );
    await playerRepository.save(player);

    return new ViewModel('default_state/create_world', {
      world: world,
      location: locationList.startLocation,
      player: player
    });
  }
};
