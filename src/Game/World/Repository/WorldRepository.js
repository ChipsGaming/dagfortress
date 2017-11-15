const EntityRepository = require('../../../Storage/EntityRepository');
const Entity = require('../World');

module.exports = class extends EntityRepository{
  get tableName(){
    return 'world';
  }

  extract(entity){
    entity.added = new Date;

    return {
      id: entity.id,
      seed: entity.seed,
      added: entity.added
    };
  }

  hydrate(data){
    const entity = new Entity(data.seed);
    entity.id = data.id
    entity.added = new Date(data.added);

    return entity;
  }

  isNew(entity){
    return entity.added === undefined;
  }
};
