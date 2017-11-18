const ViewModel = require('../../View/ViewModel');

module.exports = class{
  constructor(
    player,
    playerRepository
  ){
    this.player = player;
    this.playerRepository = playerRepository;
  }

  async process(message, match){
    const target = await this.playerRepository.find({
      'object.name', match.name,
      'object.location', this.player.location
    });
    if(target === null){
      return 'Вы бьете пустоту. С вами точно все в порядке?';'
    }

    return new ViewModel('in_world_state/attack', {
      player: this.player,
      target: target,
      isDie: Math.floor(Math.random() * 10) < 2
    });
  }
};
