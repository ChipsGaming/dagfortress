const Dynamic = require('../Dynamic');

module.exports = class extends Dynamic{
  constructor(discordUser, world, location, name){
    super(world, location, name);
    this.discordUser = discordUser;
  }
};
