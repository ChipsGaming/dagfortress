const PresetViewModel = require('../../../View/PresetViewModel'),
  WaitEvent = require('../../../Game/Object/Dynamic/Event/WaitEvent');

module.exports = class{
  constructor(
    player,
    globalEvents
  ){
    this.player = player;
    this.globalEvents = globalEvents;
  }

  async process(message, match){
    this.globalEvents.trigger(new WaitEvent(
      this.player
    ));

    return new PresetViewModel('Ваш ход зарегистрирован');
  }
};
