const Uuid = require('uuid/v4');

module.exports = class{
  constructor(task, type){
    this.id = Uuid();
    this.task = task;
    this.type = type;
    this.target = {};
    this.added = null;
  }
};
