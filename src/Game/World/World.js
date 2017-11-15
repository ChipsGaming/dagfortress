const Uuid = require('uuid/v4');

module.exports = class{
  constructor(seed){
    this.id = Uuid();
    this.seed = seed;
    this.added = undefined;
  }
};
