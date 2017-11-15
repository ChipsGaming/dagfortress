module.exports = class{
  constructor(container, player){
    this.container = container;
    this.player = player;
  }

  process(message, next){
    message.reply('In world');
  }
};
