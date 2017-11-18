const ObjectRepository = require('../../Repository/ObjectRepository');
const QueryBuilder = require('./DynamicQueryBuilder');
const Entity = require('../Dynamic');

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
      endurance: entity.endurance,
      currentEndurance: entity.currentEndurance,
      isDie: entity.isDie
    };
  }

  static hydrate(data){
    const entity = super.hydrate(data);

    entity.endurance = data.endurance;
    entity.currentEndurance = data.currentEndurance;
    entity.isDie = data.isDie;

    return entity;
  }

  static getFindStatement(database, where){
    return ObjectRepository.getFindStatement(database, where)
      .column(
        `${this.tableName}.endurance`,
        `${this.tableName}.currentEndurance`,
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

  select(objectAlias = 'object', dynamicAlias = 'dynamic'){
    return new (this.constructor.queryBuilder)(
      this.database
        .select(`${super.constructor.tableName}.*`)
        .column(
          `${this.constructor.tableName}.endurance`,
          `${this.constructor.tableName}.currentEndurance`,
          `${this.constructor.tableName}.isDie`
        )
        .from(super.constructor.tableName).as(objectAlias)
        .innerJoin(
          this.constructor.tableName,
          `${super.constructor.tableName}.id`,
          `${this.constructor.tableName}.id`
        ).as(dynamicAlias),
      objectAlias,
      dynamicAlias
    );
  }
};
