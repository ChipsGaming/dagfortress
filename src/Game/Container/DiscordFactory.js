const Discord = require('discord.js');

module.exports = class{
  constructor(){
    this.instance = null;
  }

  build(options){
    return new Promise(function(resolve, reject){
      if(this.instance === null){
        this.instance = new Discord.Client;
      }

      resolve(this.instance);
    }.bind(this));
  }
};
