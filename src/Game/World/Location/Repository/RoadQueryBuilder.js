const QueryBuilder = require('../../../../Storage/QueryBuilder');

module.exports = class extends QueryBuilder{
  // Filters
  /**
   * @param {Location|string} location Целевая локация.
   *
   * @return {Road[]} Дороги, по которым можно перейти из целевой локации.
   */
  nearby(location){
    if(typeof location == 'object'){
      location = location.id;
    }

    this.query
      .where(function(query){
        query
          .where(`${this.alias}.start`, location)
          .orWhere(`${this.alias}.end`, location);
      }.bind(this));
  
    return this;
  }
}
