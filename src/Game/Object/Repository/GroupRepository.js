const EntityRepository = require('../../../Storage/EntityRepository');
const QueryBuilder = require('./GroupQueryBuilder');
const Entity = require('../Group');

module.exports = class extends EntityRepository{
  static get tableName(){
    return 'group';
  }

  static get queryBuilder(){
    return QueryBuilder;
  }

  static extract(entity){
    entity.added = new Date;

    return {
      id: entity.id,
      alliance: entity.alliance,
      name: entity.name,
      isPlayer: entity.isPlayer,
      startLocation: entity.startLocation,
      added: entity.added
    };
  }

  static hydrate(data){
    const entity = new Entity;

    entity.id = data.id;
    entity.alliance = data.alliance;
    entity.name = data.name;
    entity.isPlayer = data.isPlayer;
    entity.startLocation = data.startLocation;
    entity.added = new Date(data.added);

    entity.lazyLoader = this.lazyLoader;

    return entity;
  }

  isNew(entity){
    return entity.added === null;
  }
};
