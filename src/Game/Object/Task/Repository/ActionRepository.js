const EntityRepository = require('../../../../Storage/EntityRepository');
const QueryBuilder = require('./ActionQueryBuilder');
const Entity = require('../Action');

module.exports = class extends EntityRepository{
  static get tableName(){
    return 'task_action';
  }

  static get queryBuilder(){
    return QueryBuilder;
  }

  static extract(entity){
    entity.added = new Date;

    return {
      id: entity.id,
      task: entity.task,
      type: entity.type,
      target: JSON.stringify(entity.target),
      added: entity.added
    };
  }

  static hydrate(data){
    const entity = new Entity;

    entity.id = data.id;
    entity.task = data.task;
    entity.type = data.type;
    entity.target = JSON.parse(data.target);
    entity.added = new Date(data.added);

    return entity;
  }

  isNew(entity){
    return entity.added === null;
  }
};
