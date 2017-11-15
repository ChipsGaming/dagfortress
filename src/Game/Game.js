const DefaultStateHandler = require('../Handler/DefaultStateHandler');
const InWorldStateHandler = require('../Handler/InWorldStateHandler');

module.exports = class{
  constructor(container){
    this.container = container;
  }

  listen(discord){
    this.discord = discord;

    discord.on('ready', this.onReady.bind(this));
    discord.on('message', this.onMessage.bind(this));
  }

  onReady(){
    console.log(`logged in as ${this.discord.user.tag}!`);
  }

  onMessage(message){
    this.container.get('PlayerRepository').build({}, container)
      .then(function(playerRepository){
        playerRepository.find('id', message.author.id)
          .then(function(player){
            if(player === null){
              new DefaultStateHandler(container)
                .process(message);
            }
            else{
              new InWorldStateHandler(container, player)
                .process(message);
            }
          });
      });
  }
};
