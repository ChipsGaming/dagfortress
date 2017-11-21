const Uuid = require('uuid/v4');

module.exports = class{
  constructor(alliance, name){
    this.id = Uuid();
    this.alliance = alliance;
    this.name = name;
    this.isPlayer = false;
    this.added = null;
  }
};
