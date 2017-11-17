const QueryBuilder = require('../../../../Storage/QueryBuilder');

module.exports = class{
  /*
  constructor(query, objectAlias, dynamicAlias, parent = null){
    super(query, objectAlias, parent);
    this.dynamicAlias = dynamicAlias;
  }
  */

  build(){
    return this.query;
  }
};
