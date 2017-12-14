const QueryBuilder = require('../../../../Storage/QueryBuilder');

module.exports = class extends QueryBuilder{
  // Filters
  /**
   * Дороги, по которым можно выйти из целевой локации.
   *
   * @param {Location|String} location Целевая локация.
   *
   * @return {RoadQueryBuilder} 
   */
  exit(location){
    location = location instanceof Object? location.id : location;

    this.query.where(`${this.alias}.start`, location);
  
    return this;
  }

  /**
   * Дороги, по которым можно перейти из целевой локации.
   *
   * @param {Location|String} location Целевая локация.
   *
   * @return {RoadQueryBuilder} 
   */
  nearby(location){
    location = location instanceof Object? location.id : location;

    this.query
      .where((query) => {
        query
          .where(`${this.alias}.start`, location)
          .orWhere(`${this.alias}.end`, location);
      });
  
    return this;
  }
}
