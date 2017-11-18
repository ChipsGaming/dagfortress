module.exports = class{
  constructor(container, player){
    this.container = container;
    this.player = player;
  }

  async process(message, match){
    const config = await this.container.get('Config').build({}, this.container),
      worldRepository = await this.container.get('WorldRepository').build({}, this.container),
      playerRepository = await this.container.get('PlayerRepository').build({}, this.container);
    
    await playerRepository.remove(this.player)
    
    const playersCount = await playerRepository.select()
      .build()
      .where('object.world', this.player.world)
      .count('object.id as count');
    
    if(parseInt(playersCount[0].count) == 0){
      await worldRepository.remove(
        await worldRepository.find('id', this.player.world)
      );
    }

    return 'Выход выполнен';
  }
};
