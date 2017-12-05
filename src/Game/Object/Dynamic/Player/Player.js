const Dynamic = require('../Dynamic');

module.exports = class extends Dynamic{
  constructor(world, location, group, name, discordUser){
    super(world, location, group, name);
    this.discordUser = discordUser;
    this.isCreator = false;
  }
};
