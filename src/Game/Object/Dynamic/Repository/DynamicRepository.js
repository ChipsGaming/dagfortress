const EntityRepository = require('../../Repository/ObjectRepository');
const QueryBuilder = require('./DynamicQueryBuilder');
const Entity = require('../Dynamic');

module.exports = class extends EntityRepository{
  static get tableName(){
    return 'dynamic';
  }

  static get queryBuilder(){
    return QueryBuilder;
  }

  static getFindStatement(database, field, value){
    return EntityRepository.getFindStatement(database, field, value)
      .column(
        `${this.tableName}.endurance`,
        `${this.tableName}.currentEndurance`
      )
      .innerJoin(this.tableName, `${super.tableName}.id`, `${this.tableName}.id`);
  }

  static getInsertStatement(database, entity){
    return [
      () => new Promise(resolve => {
        EntityRepository.getInsertStatement(database, entity).then(resolve)
      }),
      () => new Promise(resolve => {
        this.database
          .insert(this.extract(entity))
          .into(this.constructor.tableName).then(resolve)
      })
    ];
  }

  static getUpdateStatement(database, entity){
    return [
      () => new Promise(resolve => {
        EntityRepository.getUpdateStatement(database, entity).then(resolve)
      }),
      () => new Promise(resolve => {
        this.database
          .update(this.extract(entity))
          .from(this.constructor.tableName)
          .where('id', entity.id).then(resolve)
      }),
    ];
  }

  static getDeleteStatement(database, entity){
    return [
      () => new Promise(resolve => {
        EntityRepository.getDeleteStatement(database, entity).then(resolve)
      }),
      () => new Promise(resolve => {
        this.database
          .delete()
          .from(this.constructor.tableName)
          .where('id', entity.id).then(resolve)
      }),
    ];
  }

  extract(entity){
    return {
      id: entity.id,
      endurance: entity.endurance,
      currentEndurance: entity.endurance
    };
  }

  hydrate(data){
    const entity = super.hydrate(data);

    entity.endurance = data.endurance;
    entity.currentEndurance = data.currentEndurance;

    return entity;
  }

  async save(entity){
    if(this.isNew(entity)){
      let res;
      for(let statement of this.constructor.getInsertStatement(this.database, entity)){
        res = await statement();
      }

      return res;
    }
    else{
      let res;
      for(let statement of this.constructor.getUpdateStatement(this.database, entity)){
        res = await statement();
      }

      return res;
    }
  }

  async remove(entity){
    let res;
    for(let statement of this.constructor.getDeleteStatement(this.database, entity)){
      res = await statement();
    }

    return res;
  }

  select(objectAlias = 'object', dynamicAlias = 'dynamic'){
    return new (this.constructor.queryBuilder)(
      this.database
        .select(`${super.constructor.tableName}.*`)
        .column(
          `${this.constructor.tableName}.endurance`,
          `${this.constructor.tableName}.currentEndurance`
        )
        .from(super.constructor.tableName).as(alias)
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
