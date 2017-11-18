const Discord = require('discord.js');

module.exports = class{
  async build(options){
    return Promise.resolve(
      new Discord.Client
    );
  }
};
