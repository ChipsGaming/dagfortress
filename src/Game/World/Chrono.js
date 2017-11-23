const Uuid = require('uuid/v4');

module.exports = class{
  constructor(world){
    this.id = Uuid();
    this.world = world;
    this.day = 1;
    this.added = null;
  }
};
