const PresetViewModel = require('../../View/PresetViewModel');

module.exports = class{
  async process(message){
    return new PresetViewModel(`Pong! ${message.author.id}`);
  }
};
