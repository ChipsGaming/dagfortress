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

  async onMessage(message){
    console.log(
      message.author.username + '[' + moment(message.createdAt).format('DD.MM.YYYY hh:mm:ss') + ']: ' + message.content.substr(0, 10)
    );

    const playerRepository = await this.container.get('PlayerRepository').build({}, this.container),
      player = await playerRepository.find('player.discordUser', message.author.id);

    let handler = null;
    if(player === null){
      handler = new (require('../Handler/DefaultStateHandler'))(this.container);
    }
    else{
      handler = new (require('../Handler/InWorldStateHandler'))(this.container, player);
    }

    let response = await handler.process(message);

    if(typeof response == 'object'){
      const render = await this.container.get('Render').build({}, this.container);
      response = await render.render(response);
    }

    if(response === undefined){
      return;
    }

    message.reply(response);
  }
};
