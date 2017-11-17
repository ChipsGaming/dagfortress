const Object = require('../Object');

module.exports = class extends Object{
  constructor(world, location, name){
    super(world, location, name);
    this.endurance = 1;
    this.currentEndurance = this.endurance;
  }
};
