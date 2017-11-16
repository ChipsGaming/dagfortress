const EntityRepository = require('../../../../Storage/EntityRepository');
const QueryBuilder = require('./LocationQueryBuilder');
const Entity = require('../Location');

module.exports = class extends EntityRepository{
  get tableName(){
    return 'location';
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

  select(alias = 'e'){
    return new QueryBuilder(
      this.database
        .select(`${this.tableName}.*`)
        .from(this.tableName),
      alias
    );
  }
};
