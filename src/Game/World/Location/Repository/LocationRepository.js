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

  static extract(entity){
    entity.added = new Date;

    return {
      id: entity.id,
      world: entity.world,
      name: entity.name,
      description: entity.description,
      added: entity.added
    };
  }

  static hydrate(data){
    const entity = new Entity(
      data.world,
      data.name,
      data.description
    );
    entity.id = data.id
    entity.added = new Date(data.added);

    entity.lazyLoader = this.lazyLoader;

    return entity;
  }

  isNew(entity){
    return entity.added === null;
  }
};
