module.exports = class{
  constructor(player){
    this.player = player;
  }

  async process(message, match){
    if(!this.player.isCreator){
      return;
    }

    return this.doProcess(message, match);
  }
}
