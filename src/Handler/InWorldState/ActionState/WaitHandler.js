const PresetViewModel = require('../../../View/PresetViewModel');

module.exports = class{
  constructor(
    player,
    globalEvents
  ){
    this.player = player;
    this.globalEvents = globalEvents;
  }

  async process(message, match){
    this.player.wait(this.globalEvents);

    return new PresetViewModel('Ваш ход зарегистрирован');
  }
};
