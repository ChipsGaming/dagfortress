const ViewModel = require('../../View/ViewModel');

module.exports = class{
  constructor(container){
    this.container = container;
  }

  async process(message, match){
    const config = await this.container.get('Config').build({}, this.container),
      worldRepository = await this.container.get('WorldRepository').build({}, this.container);

    const worlds = await worldRepository.select().build();

    if(worlds.length == 0){
      return 'Нет созданых миров';
    }

    return new ViewModel('default_state/world_list', {
      worlds: worlds.map(worldRepository.constructor.hydrate)
    });
  }
};
