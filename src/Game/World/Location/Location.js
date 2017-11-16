const Uuid = require('uuid/v4');

module.exports = class{
  constructor(world, name, description){
    this.id = Uuid();
    this.world = world;
    this.name = name;
    this.description = description;
    this.isStart = false;
    this.added = null;
  }

  setStart(isStart){
    this.isStart = isStart;

    return this;
  }
};
