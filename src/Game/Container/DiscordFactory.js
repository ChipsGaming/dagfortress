const Discord = require('discord.js');

module.exports = class{
  async build(options, container){
    return new Discord.Client;
  }
};
