const EntityRepository = require('../../../Storage/EntityRepository');
const Entity = require('../Object');

module.exports = class extends EntityRepository{
  static get tableName(){
    return 'object';
  }

  static extract(entity){
    entity.added = new Date;

    return {
      id: entity.id,
      world: entity.world,
      location: entity.location,
      group: entity.group,
      name: entity.name,
      added: entity.added
    };
  }

  static hydrate(data){
    const entity = new Entity;

    entity.id = data.id;
    entity.world = data.world;
    entity.location = data.location;
    entity.group = data.group;
    entity.name = data.name;
    entity.added = new Date(data.added);

    entity.lazyLoader = this.lazyLoader;

    return entity;
  }

  isNew(entity){
    return entity.added === null;
  }
};
