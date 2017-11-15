const Uuid = require('uuid/v4');

module.exports = class{
  constructor(discordUser, world){
    this.id = Uuid();
    this.discordUser = discordUser;
    this.world = world;
    this.added = null;
  }
};
