const EntityRepository = require('../../../Storage/EntityRepository');
const Entity = require('../World');

module.exports = class extends EntityRepository{
  static get tableName(){
    return 'world';
  }

  static extract(entity){
    entity.added = new Date;

    return {
      id: entity.id,
      seed: entity.seed,
      name: entity.name,
      description: entity.description,
      added: entity.added
    };
  }

  static hydrate(data){
    const entity = new Entity(
      data.seed,
      data.name,
      data.description
    );
    entity.id = data.id
    entity.added = new Date(data.added);

    return entity;
  }

  isNew(entity){
    return entity.added === null;
  }
};
