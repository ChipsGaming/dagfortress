const EntityRepository = require('../../../Storage/EntityRepository');
const QueryBuilder = require('./AllianceRepository');
const Entity = require('../Alliance');

module.exports = class extends EntityRepository{
  static get tableName(){
    return 'alliance';
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
      added: entity.added
    };
  }

  static hydrate(data){
    const entity = new Entity;

    entity.id = data.id;
    entity.world = data.world;
    entity.name = data.name;
    entity.added = new Date(data.added);

    return entity;
  }

  isNew(entity){
    return entity.added === null;
  }
};
