const QueryBuilder = require('../../../../Storage/QueryBuilder');

module.exports = class extends QueryBuilder{
  // Filters
  /**
   * Дороги, по которым можно перейти из целевой локации.
   *
   * @param {Location|String} location Целевая локация.
   *
   * @return {RoadQueryBuilder} 
   */
  nearby(location){
    if(typeof location == 'object'){
      location = location.id;
    }

    this.query
      .where((query) => {
        query
          .where(`${this.alias}.start`, location)
          .orWhere(`${this.alias}.end`, location);
      });
  
    return this;
  }
}
