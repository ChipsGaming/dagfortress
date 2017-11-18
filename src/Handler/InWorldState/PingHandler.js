module.exports = class{
  constructor(player){
    this.player = player;
  }

  async process(message){
    return `Pong! Аватар "${this.player.id}"`;
  }
};
