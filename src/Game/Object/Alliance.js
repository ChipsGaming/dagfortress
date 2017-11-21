const Uuid = require('uuid/v4');

module.exports = class{
  constructor(world, name){
    this.id = Uuid();
    this.world = world;
    this.name = name;
    this.added = null;
  }
};
