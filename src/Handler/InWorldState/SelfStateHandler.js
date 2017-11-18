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
    const organs = await this.organRepository.select()
      .part(this.player.id)
      .build();

    return new ViewModel('in_world_state/self_state', {
      player: this.player,
      organs: organs
    });
  }
};
