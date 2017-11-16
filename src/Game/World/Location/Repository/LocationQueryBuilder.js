const QueryBuilder = require('../../../../Storage/QueryBuilder');
const RoadQueryBuilder = require('./RoadQueryBuilder');

module.exports = class extends QueryBuilder{
  // Joins
  joinRoad(roadRepository, alias = 'road'){
    this.query
      .innerJoin(
        roadRepository.tableName,
        function(clause){
          clause
            .on(`${this.alias}.id`, '=', `${roadRepository.tableName}.start`)
            .orOn(`${this.alias}.id`, '=', `${roadRepository.tableName}.end`);
        }.bind(this)
      );

    return new RoadQueryBuilder(this.query, alias, this);
  }
}
