const DynamicQueryBuilder = require('../../Repository/DynamicQueryBuilder');

module.exports = class extends DynamicQueryBuilder{
  constructor(query, objectAlias, dynamicAlias, playerAlias, parent = null){
    super(query, objectAlias, dynamicAlias, parent);
    this.playerAlias = playerAlias;
  }
}
