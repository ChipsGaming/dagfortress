const ViewModel = require('../../View/ViewModel');

module.exports = class{
  constructor(
    player,
    dynamicRepository,
    organRepository
  ){
    this.player = player;
    this.dynamicRepository = dynamicRepository;
    this.organRepository = organRepository;
  }

  async process(message, match){
    const target = await this.dynamicRepository.find({
      'object.name': match.target,
      'object.location': this.player.location
    });
    if(target === null){
      return `Рядом с вами нет ${match.target}`;
    }

    const organs = await this.organRepository.select()
      .part(target.id)
      .build();

    return new ViewModel('in_world_state/target_state', {
      target: target,
      organs: organs
    });
  }
};
