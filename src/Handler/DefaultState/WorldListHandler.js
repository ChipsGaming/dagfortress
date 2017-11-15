module.exports = class{
  constructor(container){
    this.container = container;
  }

  process(message, match){
    Promise.all([
      this.container.get('Config').build({}, this.container),
      this.container.get('WorldRepository').build({}, this.container)
    ])
      .then(function([config, worldRepository]){
        worldRepository.select()
          .then(function(data){
            if(data.length == 0){
              return message.reply(`Нет созданых миров`);
            }

            const worlds = data.map(worldRepository.hydrate);
            let reply = '';
            for(var i in worlds){
              reply += `${worlds[i].id}` + "\n";
            }

            return message.reply(reply);
          });
      });
  }
};
