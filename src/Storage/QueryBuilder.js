module.exports = class{
  /**
   * @param {Knex} query SQL запрос.
   * @param {String} alias Псевдоним целевой сущности.
   * @param {QueryBuilder} parent [optional] Родительский запрос (при 
   * использовании вложенности).
   */
  constructor(query, alias, parent = null){
    this.query = query;
    this.alias = alias;
    this.parent = parent;
  }

  /**
   * Подсчет числа запрашиваемых строк.
   *
   * @param {String} field [optional] Используемое при подсчете поле.
   * @param {String} alias [optional] Псевдоним результирующего поля.
   *
   * @return {QueryBuilder}
   */
  count(field = 'id', alias = 'count'){
    this.query.clearSelect()
      .count(`${this.alias}.${field} AS ${alias}`);

    return this;
  }

  /**
   * @return {Knex} SQL запрос.
   */
  build(){
    return this.query;
  }
};
