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
