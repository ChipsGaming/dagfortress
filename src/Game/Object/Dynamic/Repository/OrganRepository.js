const EntityRepository = require('../../../../Storage/EntityRepository');
const QueryBuilder = require('./OrganQueryBuilder');
const Entity = require('../Organ');

module.exports = class extends EntityRepository{
  static get tableName(){
    return 'dynamic_organ';
  }

  static get queryBuilder(){
    return QueryBuilder;
  }

  static extract(entity){
    entity.added = new Date;

    return {
      id: entity.id,
      dynamic: entity.dynamic,
      name: entity.name,
      damage: entity.damage,
      isVital: entity.isVital,
      isWeapon: entity.isWeapon,
      isLegs: entity.isLegs,
      isKeeping: entity.isKeeping,
      mass: entity.mass,
      added: entity.added
    };
  }

  static hydrate(data){
    const entity = new Entity;

    entity.id = data.id;
    entity.dynamic = data.dynamic;
    entity.name = data.name;
    entity.damage = data.damage;
    entity.isVital = data.isVital;
    entity.isWeapon = data.isWeapon;
    entity.isLegs = data.isLegs;
    entity.isKeeping = data.isKeeping;
    entity.mass = data.mass;
    entity.added = new Date(data.added);

    return entity;
  }

  isNew(entity){
    return entity.added === null;
  }
};
