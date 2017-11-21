const Uuid = require('uuid/v4');
const EventJournal = require('../../Event/EventJournal');

module.exports = class{
  constructor(world, location, group, name){
    this.id = Uuid();
    this.world = world;
    this.location = location;
    this.group = group;
    this.name = name;
    this.added = null;

    this.events = new EventJournal;
  }
};
