const Uuid = require('uuid/v4');

module.exports = class{
  constructor(seed, name, description){
    this.id = Uuid();
    this.seed = seed;
    this.name = name;
    this.description = description;
    this.added = null;
  }
};
