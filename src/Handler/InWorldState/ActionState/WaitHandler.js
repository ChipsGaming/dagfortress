const PresetViewModel = require('../../../View/PresetViewModel');

module.exports = class{
  constructor(
    player,
    globalEvents,
    playerRepository
  ){
    this.player = player;
    this.globalEvents = globalEvents;
    this.playerRepository = playerRepository;
  }

  async process(message, match){
    let count = match.count;
    if(count === undefined){
      count = 1;
    }
    
    this.player.wait(count);
    this.globalEvents.merge(this.player.events);

    return new PresetViewModel('Ваш ход зарегистрирован');
  }
};
