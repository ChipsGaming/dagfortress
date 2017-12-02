const EventJournal = require('../EventJournal');

module.exports = class{
  constructor(){
    this.instances = new Map;
  }

  async build(options, container){
    if(!('world' in options)){
      throw new Error('Expected world');
    }
    const world = options.world instanceof Object? options.world.id : options.world;

    if(!this.instances.has(world)){
      this.instances.set(world, new EventJournal);
    }

    return this.instances.get(world);
  }
};
