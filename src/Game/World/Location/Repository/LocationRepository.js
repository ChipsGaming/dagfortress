const EntityRepository = require('../../../../Storage/EntityRepository');
const QueryBuilder = require('./LocationQueryBuilder');
const Entity = require('../Location');

module.exports = class extends EntityRepository{
  static get tableName(){
    return 'location';
  }

  static get queryBuilder(){
    return QueryBuilder;
  }

  extract(entity){
    entity.added = new Date;

    return {
      id: entity.id,
      world: entity.world,
      name: entity.name,
      description: entity.description,
      isStart: entity.isStart,
      added: entity.added
    };
  }

  hydrate(data){
    const entity = new Entity(
      data.world,
      data.name,
      data.description
    );
    entity.id = data.id
    entity.isStart = data.isStart;
    entity.added = new Date(data.added);

    return entity;
  }

  isNew(entity){
    return entity.added === null;
  }
};
