const EntityRepository = require('../../../../Storage/EntityRepository');
const QueryBuilder = require('./RoadQueryBuilder');
const Entity = require('../Road');

module.exports = class extends EntityRepository{
  get tableName(){
    return 'road';
  }

  extract(entity){
    entity.added = new Date;

    return {
      id: entity.id,
      start: entity.start,
      end: entity.end,
      added: entity.added
    };
  }

  hydrate(data){
    const entity = new Entity(data.start, data,end);
    entity.id = data.id
    entity.added = new Date(data.added);

    return entity;
  }

  isNew(entity){
    return entity.added === null;
  }

  select(alias = 'e'){
    return new QueryBuilder(
      this.database
        .select(`${this.tableName}.*`)
        .from(this.tableName),
      alias
    );
  }
};
