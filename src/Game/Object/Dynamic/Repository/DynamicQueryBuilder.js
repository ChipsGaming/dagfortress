const ObjectQueryBuilder = require('../../Repository/ObjectQueryBuilder');

module.exports = class extends ObjectQueryBuilder{
  constructor(
    query,
    objectAlias,
    dynamicAlias,
    parent = null
  ){
    super(query, objectAlias, parent);
    this.dynamicAlias = dynamicAlias;
  }

  // Filters
  /**
   * Объекты, способные двигаться в текущем ходе.
   *
   * @return {DynamicQueryBuilder}
   */
  active(){
    this.query.where(`${this.dynamicAlias}.currentEndurance`, '>', 0);

    return this;
  }

  /**
   * Мертвые объекты.
   *
   * @return {DynamicQueryBuilder}
   */
  die(){
    this.query.where(`${this.dynamicAlias}.isDie`, true);

    return this;
  }

  /**
   * Живые объекты.
   *
   * @return {DynamicQueryBuilder}
   */
  alive(){
    this.query.where(`${this.dynamicAlias}.isDie`, false);

    return this;
  }
};
