const Discord = require('discord.js');

module.exports = class{
  build(options){
    return new Promise(function(resolve, reject){
      resolve(new Discord.Client);
    }.bind(this));
  }
};
