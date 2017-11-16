const Uuid = require('uuid/v4');

module.exports = class{
  constructor(world){
    this.id = Uuid();
    this.world = world;
    this.isStart = false;
    this.added = null;
  }

  setStart(isStart){
    this.isStart = isStart;

    return this;
  }
};
