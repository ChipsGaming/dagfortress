const QueryBuilder = require('../../../../Storage/QueryBuilder');
const RoadQueryBuilder = require('./RoadQueryBuilder');

module.exports = class extends QueryBuilder{
  // Joins
  joinRoad(roadRepository, alias = 'road'){
    this.query
      .innerJoin(roadRepository.constructor.tableName, (clause) => {
        clause
          .on(`${this.alias}.id`, '=', `${roadRepository.constructor.tableName}.start`)
          .orOn(`${this.alias}.id`, '=', `${roadRepository.constructor.tableName}.end`);
      });

    return new RoadQueryBuilder(this.query, alias, this);
  }
}
