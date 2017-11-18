const Uuid = require('uuid/v4');
const EventJournal = require('../../Event/EventJournal');

module.exports = class{
  constructor(world, location, name){
    this.id = Uuid();
    this.world = world;
    this.location = location;
    this.name = name;
    this.added = null;

    this.events = new EventJournal;
  }
};
