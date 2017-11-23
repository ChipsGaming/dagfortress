const EntityRepository = require('../../../Storage/EntityRepository');
const QueryBuilder = require('./ChronoQueryBuilder');
const Entity = require('../Chrono');

module.exports = class extends EntityRepository{
  static get tableName(){
    return 'chrono';
  }

  static get queryBuilder(){
    return QueryBuilder;
  }

  static extract(entity){
    entity.added = new Date;

    return {
      id: entity.id,
      world: entity.world,
      day: entity.day,
      added: entity.added
    };
  }

  static hydrate(data){
    const entity = new Entity(
      data.world
    );
    entity.id = data.id;
    entity.day = data.day;
    entity.added = new Date(data.added);

    return entity;
  }

  isNew(entity){
    return entity.added === null;
  }
};
