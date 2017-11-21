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
   * Являющиеся жизненноважными.
   *
   * @return {OrganQueryBuilder}
   */
  vital(){
    this.query.where(`${this.alias}.isVital`, true);

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

  // Order
  /**
   * Сортировка по массе.
   *
   * @param {String} type Тип сортировки.
   *
   * @return {OrganQueryBuilder}
   */
  orderByMass(type = 'ASC'){
    this.query.orderBy(`${this.alias}.mass`, type);

    return this;
  }
};
