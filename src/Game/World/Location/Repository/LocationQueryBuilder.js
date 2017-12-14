const QueryBuilder = require('../../../../Storage/QueryBuilder');
const RoadQueryBuilder = require('./RoadQueryBuilder');

module.exports = class extends QueryBuilder{
  // Joins
  joinRoad(roadRepository, alias = 'road'){
    this.query
      .innerJoin(`${roadRepository.constructor.tableName} AS ${alias}`, (clause) => {
        clause
          .on(`${this.alias}.id`, '=', `${roadRepository.constructor.tableName}.start`)
          .orOn(`${this.alias}.id`, '=', `${roadRepository.constructor.tableName}.end`);
      });

    return new RoadQueryBuilder(this.query, alias, this);
  }

  // Filters
  /**
   * Локации, относящиеся к данному миру.
   *
   * @param {World|String} world Целевой мир.
   *
   * @return {LocationQueryBuilder}
   */
  inWorld(world){
    world = world instanceof Object? world.id : world;

    this.query.where(`${this.alias}.world`, world);

    return this;
  }

  /**
   * Локации с заданым наименованием.
   *
   * @param {String} name Наименование целевых локаций.
   *
   * @return {LocationQueryBuilder}
   */
  withName(name){
    this.query.where(`${this.alias}.name`, name);

    return this;
  }

  /**
   * Соседние локации.
   *
   * @param {RoadRepository} roadRepository
   * @param {Location|String} location Целевая локация.
   * @param {String} alias Псевдоним подключаемой сущности.
   *
   * @return {LocationQueryBuilder}
   */
  nearby(roadRepository, location, alias = 'road'){
    location = location instanceof Object? location.id : location;

    this.joinRoad(roadRepository, alias)
      .nearby(location);
    this.query
      .where(`${this.alias}.id`, '!=', location);

    return this;
  }
}
