const EntityRepository = require('../../../../Storage/EntityRepository');
const QueryBuilder = require('./RoadQueryBuilder');
const Entity = require('../Road');

module.exports = class extends EntityRepository{
  static get tableName(){
    return 'road';
  }

  static get queryBuilder(){
    return QueryBuilder;
  }

  static extract(entity){
    entity.added = new Date;

    return {
      id: entity.id,
      start: entity.start,
      end: entity.end,
      added: entity.added
    };
  }

  static hydrate(data){
    const entity = new Entity(data.start, data.end);
    entity.id = data.id
    entity.added = new Date(data.added);

    return entity;
  }

  isNew(entity){
    return entity.added === null;
  }
};
