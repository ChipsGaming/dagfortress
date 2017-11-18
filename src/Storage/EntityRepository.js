const QueryBuilder = require('./QueryBuilder');

module.exports = class{
  /**
   * @return {String} Наименование таблицы в базе данных.
   */
  static get tableName(){
  }

  /**
   * @param {Object} where Условие выборки.
   *
   * @return {Select} Выражение для поиска по заданному полю.
   */
  static getFindStatement(database, where){
    return database
      .select(`${this.tableName}.*`)
      .from(this.tableName)
      .where(where)
      .limit(1);
  }

  /**
   * @param {Object} entity Исходная сущность.
   *
   * @return {Select[]} Выражения для добавления состояния сущности.
   */
  static getInsertStatement(database, entity){
    return [
      database
        .insert(this.extract(entity))
        .into(this.tableName)
    ];
  }

  /**
   * @param {Object} entity Исходная сущность.
   *
   * @return {Select[]} Выражения для обновления состояния сущности.
   */
  static getUpdateStatement(database, entity){
    return [
      database
        .update(this.extract(entity))
        .from(this.tableName)
        .where('id', entity.id)
    ];
  }

  /**
   * @param {Object} entity Исходная сущность.
   *
   * @return {Select[]} Выражения для удаления состояния сущности.
   */
  static getDeleteStatement(database, entity){
    return [
      database
        .delete()
        .from(this.tableName)
        .where('id', entity.id)
    ];
  }

  /**
   * @return {Class} Используемый класс конструктора запросов.
   */
  static get queryBuilder(){
    return QueryBuilder;
  }

  /**
   * @param {Object} entity Исходная сущность.
   *
   * @return {Object} Данные для сохранения в базу данных.
   */
  static extract(entity){
  }

  /**
   * @param {Object} data Строка базы данных.
   *
   * @return {Object} Восстановленная из строки сущность.
   */
  static hydrate(data){
  }

  /**
   * @param {Knex} database Подключение к базе данных.
   */
  constructor(database){
    this.database = database;
  }

  /**
   * @param {Array} rows Строки базы данных.
   *
   * @return {Generator} Текущая, восстановленная из строки сущность.
   */
  * hydrateAll(rows){
    for(let row of rows){
      yield this.constructor.hydrate(row);
    }
  }

  /**
   * @param {Object} entity Проверяемая сущность.
   *
   * @return {Boolean} true - если сущность еще не сохранялась.
   */
  isNew(entity){
    return entity.id === undefined;
  }

  /**
   * Сохраняет состояние сущности в базу данных.
   *
   * @param {Object} entity Сохраняемая сущность.
   *
   * @return {Promise}
   */
  async save(entity){
    if(this.isNew(entity)){
      let res;
      for(let statement of this.constructor.getInsertStatement(this.database, entity)){
        res = await statement;
      }

      return res;
    }
    else{
      let res;
      for(let statement of this.constructor.getUpdateStatement(this.database, entity)){
        res = await statement;
      }

      return res;
    }
  }

  /**
   * Удаляет состояние сущности из базы данных.
   *
   * @param {Object} entity Удаляемая сущность.
   *
   * @return {Promise}
   */
  async remove(entity){
    let res;
    for(let statement of this.constructor.getDeleteStatement(this.database, entity)){
      res = await statement;
    }

    return res;
  }

  /**
   * @param {String|Object} field Имя проверяемого поля.
   * @param {String} value Искомое значение.
   *
   * @return {Object|null} Сущность или null - если она не найдена.
   */
  async find(field, value){
    let where = field;
    if(typeof field == 'string'){
      where = {};
      where[field] = value;
    }

    const data = await this.constructor.getFindStatement(this.database, where);

    if(data.length == 0){
      return null;
    }

    return this.constructor.hydrate(data[0]);
  }

  /**
   * @param {String} alias Используемый псевдоним.
   *
   * @return {QueryBuilder} Конструктор запросов.
   */
  select(alias = 'e'){
    return new (this.constructor.queryBuilder)(
      this.database
        .select(`${this.constructor.tableName}.*`)
        .from(this.constructor.tableName).as(alias),
      alias
    );
  }
};
