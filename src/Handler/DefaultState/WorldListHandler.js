const ViewModel = require('../../View/ViewModel'),
  PresetViewModel = require('../../View/PresetViewModel');

module.exports = class{
  /**
   * @param {WorldRepository} worldRepository
   */
  constructor(
    worldRepository
  ){
    this.worldRepository = worldRepository;
  }

  async process(message, match){
    const worlds = await this.worldRepository.fetchAll();
    if(worlds.length == 0){
      return new PresetViewModel('Нет созданых миров');
    }

    for(const world of worlds){
      world.playerGroups = await world.getPlayerGroup();
    }

    return new ViewModel('default_state/world_list', {
      worlds: worlds
    });
  }
};
