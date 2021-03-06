const ViewModel = require('../../View/ViewModel');

module.exports = class{
  constructor(player){
    this.player = player;
  }

  async process(message, next){
    return new ViewModel('in_world_state/help', {
      player: this.player
    });
  }
};
