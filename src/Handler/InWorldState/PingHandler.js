module.exports = class{
  constructor(player){
    this.player = player;
  }

  process(message){
    return `Pong! Аватар "${this.player.id}"`;
  }
};
