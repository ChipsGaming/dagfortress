const QueryBuilder = require('../../../../Storage/QueryBuilder');

module.exports = class extends QueryBuilder{
  // Filters
  /**
   * Являющиеся частью объекта.
   *
   * @param {Dynamic|String} dynamic Целевой объект.
   *
   * @return {OrganQueryBuilder}
   */
  part(dynamic){
    dynamic = dynamic instanceof Object? dynamic.id : dynamic;

    this.query.where(`${this.alias}.dynamic`, dynamic);

    return this;
  }

  /**
   * Являющиеся оружием.
   *
   * @return {OrganQueryBuilder}
   */
  weapon(){
    this.query.where(`${this.alias}.isWeapon`, true);

    return this;
  }

  /**
   * Являющиеся ногами.
   *
   * @return {OrganQueryBuilder}
   */
  legs(){
    this.query.where(`${this.alias}.isLegs`, true);

    return this;
  }

  /**
   * Являющиеся контейнерами предметов.
   *
   * @return {OrganQueryBuilder}
   */
  keeping(){
    this.query.where(`${this.alias}.isKeeping`, true);

    return this;
  }
};
