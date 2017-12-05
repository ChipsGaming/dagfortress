const PresetViewModel = require('../../View/PresetViewModel');

module.exports = class{
  constructor(player){
    this.player = player;
  }

  async process(message){
    return new PresetViewModel(`Pong! Аватар "${this.player.id}"`);
  }
};
