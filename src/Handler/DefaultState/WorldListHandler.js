const ViewModel = require('../../View/ViewModel');

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
    const worlds = await this.worldRepository.select().build();

    if(worlds.length == 0){
      return 'Нет созданых миров';
    }

    return new ViewModel('default_state/world_list', {
      worlds: worlds.map(this.worldRepository.constructor.hydrate)
    });
  }
};
