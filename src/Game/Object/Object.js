const Uuid = require('uuid/v4');

module.exports = class{
  constructor(world, location, name){
    this.id = Uuid();
    this.world = world;
    this.location = location;
    this.name = name;
    this.added = null;
  }
};
