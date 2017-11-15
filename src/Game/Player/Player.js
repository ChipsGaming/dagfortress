const Uuid = require('uuid/v4');

module.exports = class{
  constructor(discordUser, world, location){
    this.id = Uuid();
    this.discordUser = discordUser;
    this.world = world;
    this.location = location;
    this.added = null;
  }
};
