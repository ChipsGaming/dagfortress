const EntityRepository = require('../../../../Storage/EntityRepository');
const Entity = require('../Location');

module.exports = class extends EntityRepository{
  get tableName(){
    return 'location';
  }

  extract(entity){
    entity.added = new Date;

    return {
      id: entity.id,
      world: entity.world,
      isStart: entity.isStart,
      added: entity.added
    };
  }

  hydrate(data){
    const entity = new Entity(data.world);
    entity.id = data.id
    entity.isStart = data.isStart;
    entity.added = new Date(data.added);

    return entity;
  }

  isNew(entity){
    return entity.added === null;
  }
};
