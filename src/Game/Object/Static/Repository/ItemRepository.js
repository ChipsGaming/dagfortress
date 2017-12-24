const ObjectRepository = require('../../Repository/ObjectRepository');
const QueryBuilder = require('./ItemQueryBuilder');
const Entity = require('../Item');

module.exports = class extends ObjectRepository{
  static get tableName(){
    return 'item';
  }

  static get queryBuilder(){
    return QueryBuilder;
  }

  static extract(entity){
    return {
      id: entity.id,
      owner: entity.owner
    };
  }

  static hydrate(data){
    const entity = Object.assign(
      new Entity,
      super.hydrate(data)
    );

    entity.owner = data.owner;

    return entity;
  }

  static getFindStatement(database, where){
    return ObjectRepository.getFindStatement(database, where)
      .column(
        `${this.tableName}.owner`
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

  static getSelectStatement(database, objectAlias = 'object', itemAlias = 'item'){
    return ObjectRepository.getSelectStatement(database, objectAlias)
        .innerJoin(
          `${this.tableName} AS ${itemAlias}`,
          `${objectAlias}.id`,
          `${itemAlias}.id`
        )
        .column(
          `${itemAlias}.owner`
        );
  }

  select(objectAlias = 'object', itemAlias = 'item'){
    return new (this.constructor.queryBuilder)(
      this.constructor.getSelectStatement(this.database, objectAlias, itemAlias),
      objectAlias,
      itemAlias
    );
  }
};
