const moment = require('moment');

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
    console.log(
      message.author.username + '[' + moment(message.createdAt).format('DD.MM.YYYY hh:mm:ss') + ']: ' + message.content.substr(0, 10)
    );

    this.container.get('PlayerRepository').build({}, this.container)
      .then(function(playerRepository){
        playerRepository.find('discordUser', message.author.id)
          .then(function(player){
            if(player === null){
              new (require('../Handler/DefaultStateHandler'))(this.container)
                .process(message);
            }
            else{
              new (require('../Handler/InWorldStateHandler'))(this.container, player)
                .process(message);
            }
          }.bind(this));
      }.bind(this));
  }
};
