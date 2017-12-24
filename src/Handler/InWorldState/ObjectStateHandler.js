const ViewModel = require('../../View/ViewModel'),
  PresetViewModel = require('../../View/PresetViewModel');

module.exports = class{
  constructor(
    player,
    dynamicRepository
  ){
    this.player = player;
    this.dynamicRepository = dynamicRepository;
  }

  async process(message, match){
    const target = await this.dynamicRepository.find({
      'object.name': match.target,
      'object.location': this.player.location
    });
    if(target === null){
      return new PresetViewModel(`Рядом с вами нет ${match.target}`);
    }

    return new ViewModel('in_world_state/target_state', {
      target: target
    });
  }
};
