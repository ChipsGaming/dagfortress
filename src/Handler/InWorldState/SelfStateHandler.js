const ViewModel = require('../../View/ViewModel');

module.exports = class{
  constructor(
    player
  ){
    this.player = player;
  }

  async process(message){
    const items = await this.player.getItems();

    return new ViewModel('in_world_state/self_state', {
      player: this.player,
      items: items
    });
  }
};
