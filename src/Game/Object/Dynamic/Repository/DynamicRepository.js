const ObjectRepository = require('../../Repository/ObjectRepository');
const QueryBuilder = require('./DynamicQueryBuilder');
const Entity = require('../Dynamic');

const LazyLoader = require('./DynamicLazyLoader');

module.exports = class extends ObjectRepository{
  static get tableName(){
    return 'dynamic';
  }

  static get queryBuilder(){
    return QueryBuilder;
  }

  static extract(entity){
    return {
      id: entity.id,
      group: entity.group,
      hitPoints: entity.hitPoints,
      isDie: entity.isDie
    };
  }

  static hydrate(data){
    const entity = Object.assign(
      new Entity,
      super.hydrate(data)
    );

    entity.group = data.group;
    entity.hitPoints = data.hitPoints;
    entity.isDie = data.isDie;

    return entity;
  }

  static getFindStatement(database, where){
    return ObjectRepository.getFindStatement(database, where)
      .column(
        `${this.tableName}.group`,
        `${this.tableName}.hitPoints`,
        `${this.tableName}.isDie`
      )
      .innerJoin(this.tableName, `${super.tableName}.id`, `${this.tableName}.id`);
  }

  static getInsertStatement(database, entity){
    return ObjectRepository.getInsertStatement(database, entity)
      .concat([
        database
          .insert(this.extract(entity))
          .into(this.tableName)
      ]);
  }

  static getUpdateStatement(database, entity){
    return ObjectRepository.getUpdateStatement(database, entity)
      .concat([
        database
          .update(this.extract(entity))
          .from(this.tableName)
          .where('id', entity.id)
      ]);
  }

  static getDeleteStatement(database, entity){
    return ObjectRepository.getDeleteStatement(database, entity)
      .concat([
        database
          .delete()
          .from(this.tableName)
          .where('id', entity.id)
      ]);
  }

  static getSelectStatement(database, objectAlias = 'object', dynamicAlias = 'dynamic'){
    return ObjectRepository.getSelectStatement(database, objectAlias)
        .innerJoin(
          `${this.tableName} AS ${dynamicAlias}`,
          `${objectAlias}.id`,
          `${dynamicAlias}.id`
        )
        .column(
          `${dynamicAlias}.group`,
          `${dynamicAlias}.hitPoints`,
          `${dynamicAlias}.isDie`
        );
  }

  select(objectAlias = 'object', dynamicAlias = 'dynamic'){
    return new (this.constructor.queryBuilder)(
      this.constructor.getSelectStatement(this.database, objectAlias, dynamicAlias),
      objectAlias,
      dynamicAlias
    );
  }
};
