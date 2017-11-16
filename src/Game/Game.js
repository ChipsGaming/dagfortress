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
    console.log(`onMessage "${message.author.username}": ` + message.content.substr(0, 10));

    this.container.get('PlayerRepository').build({}, this.container)
      .then(function(playerRepository){
        playerRepository.find('discordUser', message.author.id)
          .then(function(player){
            if(player === null){
              new DefaultStateHandler(this.container)
                .process(message);
            }
            else{
              new InWorldStateHandler(this.container, player)
                .process(message);
            }
          }.bind(this));
      }.bind(this));
  }
};
