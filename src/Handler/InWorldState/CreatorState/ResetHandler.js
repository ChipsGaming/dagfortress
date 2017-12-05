const AbstractHandler = require('./AbstractHandler'),
  PresetViewModel = require('../../../View/PresetViewModel');

module.exports = class extends AbstractHandler{
  constructor(
    player,
    globalEvents
  ){
    super(player);
    this.globalEvents = globalEvents;
  }

  async doProcess(message, match){
    this.globalEvents.clear();

    return new PresetViewModel('Ходы сброшены');
  }
};
