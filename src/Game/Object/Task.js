const Uuid = require('uuid/v4');

module.exports = class{
  constructor(group, type, target, name, description){
    this.id = Uuid();
    this.group = group;
    this.type = type;
    this.target = target;
    this.name = name;
    this.description = description;
    this.added = null;
  }
};
