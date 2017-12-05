const AbstractHandler = require('./AbstractHandler'),
  PresetViewModel = require('../../../View/PresetViewModel');

module.exports = class extends AbstractHandler{
  constructor(
    player,
    playerRepository
  ){
    super(player);
    this.playerRepository = playerRepository;
  }

  async doProcess(message, match){
    const target = await this.playerRepository.find('object.name', match.target);
    if(target === null){
      return `В этом мире нет ${match.target}`;
    }

    await this.playerRepository.remove(target)

    return new PresetViewModel('Игрок удален');
  }
};
