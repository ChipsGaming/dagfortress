module.exports = class{
  constructor(player){
    this.player = player;
  }

  process(message){
    message.reply(`Pong! Аватар "${this.player.id}"`);
  }
};
