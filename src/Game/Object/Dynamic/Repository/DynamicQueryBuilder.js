const QueryBuilder = require('../../../../Storage/QueryBuilder');

module.exports = class extends QueryBuilder{
  constructor(query, objectAlias, dynamicAlias, parent = null){
    super(query, objectAlias, parent);
    this.dynamicAlias = dynamicAlias;
  }
};
