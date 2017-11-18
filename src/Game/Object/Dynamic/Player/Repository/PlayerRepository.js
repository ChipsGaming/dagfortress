const ObjectRepository = require('../../../Repository/ObjectRepository');
const DynamicRepository = require('../../Repository/DynamicRepository');
const QueryBuilder = require('./PlayerQueryBuilder');
const Entity = require('../Player');

module.exports = class extends DynamicRepository{
  static get tableName(){
    return 'player';
  }

  static get queryBuilder(){
    return QueryBuilder;
  }

  static extract(entity){
    return {
      id: entity.id,
      discordUser: entity.discordUser
    };
  }

  static hydrate(data){
    const entity = super.hydrate(data);

    entity.discordUser = data.discordUser;

    return entity;
  }

  static getFindStatement(database, where){
    return DynamicRepository.getFindStatement(database, where)
      .column(
        `${this.tableName}.discordUser`
      )
      .innerJoin(this.tableName, `${super.tableName}.id`, `${this.tableName}.id`);
  }

  static getInsertStatement(database, entity){
    return DynamicRepository.getInsertStatement(database, entity)
      .concat([
        database
          .insert(this.extract(entity))
          .into(this.tableName)
      ]);
  }

  static getUpdateStatement(database, entity){
    return DynamicRepository.getUpdateStatement(database, entity)
      .concat([
        database
          .update(this.extract(entity))
          .from(this.tableName)
          .where('id', entity.id)
      ]);
  }

  static getDeleteStatement(database, entity){
    return DynamicRepository.getDeleteStatement(database, entity)
      .concat([
        database
          .delete()
          .from(this.tableName)
          .where('id', entity.id)
      ]);
  }

  select(objectAlias = 'object', dynamicAlias = 'dynamic', playerAlias = 'player'){
    return new (this.constructor.queryBuilder)(
      this.database
        .select(`${ObjectRepository.tableName}.*`)
        .column(
          `${DynamicRepository.tableName}.endurance`,
          `${DynamicRepository.tableName}.currentEndurance`,
          `${this.constructor.tableName}.discordUser`
        )
        .from(ObjectRepository.tableName).as(objectAlias)
        .innerJoin(
          DynamicRepository.tableName,
          `${ObjectRepository.tableName}.id`,
          `${DynamicRepository.tableName}.id`
        ).as(dynamicAlias)
        .innerJoin(
          this.constructor.tableName,
          `${DynamicRepository.tableName}.id`,
          `${this.constructor.tableName}.id`
        ).as(playerAlias),
      objectAlias,
      dynamicAlias
    );
  }
};
