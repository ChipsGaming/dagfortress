const ViewModel = require('../../View/ViewModel');

module.exports = class{
  constructor(
    player
  ){
    this.player = player;
  }

  async process(message){
    const organs = await this.player.getOrgans()

    return new ViewModel('in_world_state/self_state', {
      player: this.player,
      organs: organs
    });
  }
};
