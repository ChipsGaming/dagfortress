const ViewModel = require('../../View/ViewModel');

module.exports = class{
  constructor(container){
    this.container = container;
  }

  process(message, match){
    return Promise.all([
      this.container.get('Config').build({}, this.container),
      this.container.get('WorldRepository').build({}, this.container)
    ])
      .then(function([config, worldRepository]){
        return worldRepository.select()
          .build()
          .then(function(data){
            if(data.length == 0){
              return 'Нет созданых миров';
            }

            return new ViewModel('default_state/world_list', {
              worlds: data.map(worldRepository.hydrate)
            });
          });
      });
  }
};
