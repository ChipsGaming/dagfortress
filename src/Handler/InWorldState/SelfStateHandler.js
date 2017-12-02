const ViewModel = require('../../View/ViewModel');

module.exports = class{
  constructor(
    player,
    organRepository
  ){
    this.player = player;
    this.organRepository = organRepository;
  }

  async process(message){
    const organs = await this.player.getOrgans(this.organRepository)

    return new ViewModel('in_world_state/self_state', {
      player: this.player,
      organs: organs
    });
  }
};
