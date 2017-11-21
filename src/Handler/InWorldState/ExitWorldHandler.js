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
    
    const playersCount = await this.playerRepository.select()
      .inWorld(this.player.world)
      .alive()
      .build()
      .count('object.id as count');
    
    if(parseInt(playersCount[0].count) == 0){
      await this.worldRepository.remove(
        await this.worldRepository.find('id', this.player.world)
      );
    }

    return 'Выход выполнен';
  }
};
