const Dynamic = require('../Dynamic');

module.exports = class extends Dynamic{
  constructor(world, location, name, discordUser){
    super(world, location, name);
    this.discordUser = discordUser;
  }
};
