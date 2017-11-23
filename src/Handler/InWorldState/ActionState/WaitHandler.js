const ViewModel = require('../../../View/ViewModel');

module.exports = class{
  constructor(
    player,
    playerRepository
  ){
    this.player = player;
    this.playerRepository = playerRepository;
  }

  async process(message, match){
    let count = match.count;
    if(count === undefined){
      count = 1;
    }
    
    while(this.player.currentEndurance > 0 && count > 0){
      this.player.currentEndurance--;
      count--;
    }

    await this.playerRepository.save(this.player);

    return 'Вы пропустили ход';
  }
};
