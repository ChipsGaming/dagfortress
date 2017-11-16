const Uuid = require('uuid/v4');

module.exports = class{
  constructor(start, end){
    this.id = Uuid();
    this.start = start;
    this.end = end;
    this.added = null;
  }
};
