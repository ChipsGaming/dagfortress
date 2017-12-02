const EntityRepository = require('../../../../Storage/EntityRepository');
const QueryBuilder = require('./TaskQueryBuilder');
const Entity = require('../Task');

module.exports = class extends EntityRepository{
  static get tableName(){
    return 'task';
  }

  static get queryBuilder(){
    return QueryBuilder;
  }

  static extract(entity){
    entity.added = new Date;

    return {
      id: entity.id,
      group: entity.group,
      name: entity.name,
      description: entity.description,
      priority: entity.priority,
      isComplete: entity.isComplete,
      added: entity.added
    };
  }

  static hydrate(data){
    const entity = new Entity;

    entity.id = data.id;
    entity.group = data.group;
    entity.name = data.name;
    entity.description = data.description;
    entity.priority = data.priority;
    entity.isComplete = data.isComplete;
    entity.added = new Date(data.added);

    return entity;
  }

  isNew(entity){
    return entity.added === null;
  }
};
