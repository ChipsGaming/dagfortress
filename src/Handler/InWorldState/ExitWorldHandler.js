module.exports = class{
  constructor(
    player,
    worldRepository,
    playerRepository
  ){
    this.player = player;
    this.worldRepository = worldRepository;
    this.playerRepository = playerRepository;
  }

  async process(message, match){
    await this.playerRepository.remove(this.player)
    
    const world = await this.worldRepository.find('id', this.player.world),
      playersCount = await world.getAlivePlayersCount(this.playerRepository);
    if(playersCount == 0){
      await this.worldRepository.remove(world);
    }

    return 'Выход выполнен';
  }
};
