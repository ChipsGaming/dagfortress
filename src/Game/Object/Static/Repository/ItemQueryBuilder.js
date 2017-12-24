const ObjectQueryBuilder = require('../../Repository/ObjectQueryBuilder'),
  LocationRepository = require('../../../World/Location/Repository/LocationQueryBuilder');

module.exports = class extends ObjectQueryBuilder{
  constructor(
    query,
    objectAlias,
    itemAlias,
    parent = null
  ){
    super(query, objectAlias, parent);
    this.itemAlias = itemAlias;
  }

  // Joins
  joinLocation(locationRepository, alias = 'location'){
    this.query
      .innerJoin(
        `${locationRepository.constructor.tableName} AS ${alias}`,
        `${alias}.id`,
        `${this.alias}.location`
      );

    return new LocationRepository(this.query, alias, this);
  }

  // Filters
  /**
   * Предметы, относящиеся к данному миру.
   *
   * @param {World|String} world Целевой мир.
   * @param {LocationRepository} locationRepository
   * @param {String} alias [optional] Псевдоним подключаемой сущности.
   *
   * @return {GroupQueryBuilder}
   */
  inWorld(world, locationRepository, alias = 'location'){
    world = world instanceof Object? world.id : world;

    this.joinLocation(locationRepository, alias)
      .inWorld(world);

    return this;
  }

  /**
   * Предметы из данной локации.
   *
   * @param {Location|String} location Целевая локация.
   *
   * @return {ItemQueryBuilder}
   */
  inLocation(location){
    location = location instanceof Object? location.id : location;

    this.query.where(`${this.alias}.location`, location);

    return this;
  }

  /**
   * Принадлежащие данному динамическому объекту.
   *
   * @param {Dynamic|String} owner Целевой владелец.
   *
   * @return {ItemQueryBuilder}
   */
  owner(owner){
    owner = owner instanceof Object? owner.id : owner;

    this.query.where(`${this.itemAlias}.owner`, owner);

    return this;
  }

  /**
   * Не принадлежащие кому либо.
   *
   * @return {ItemQueryBuilder}
   */
  withoutOwner(){
    this.query.where(`${this.itemAlias}.owner`, null);

    return this;
  }

  /**
   * Предметы с данным именем.
   *
   * @param {String} name Целевое имя.
   *
   * @return {ObjectQueryBuilder}
   */
  withName(name){
    this.query.where(`${this.alias}.name`, '=', name);

    return this;
  }
};
