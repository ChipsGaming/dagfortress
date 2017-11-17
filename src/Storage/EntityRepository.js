const QueryBuilder = require('./QueryBuilder');

module.exports = class{
  /**
   * @return {String} Наименование таблицы в базе данных.
   */
  static get tableName(){
  }

  /**
   * @param {String} field Имя проверяемого поля.
   * @param {String} value Искомое значение.
   *
   * @return {Select} Выражение для поиска по заданному полю.
   */
  static getFindStatement(database, field, value){
    return database
      .select(`${this.tableName}.*`)
      .from(this.tableName)
      .where(`${this.tableName}.${field}`, value)
      .limit(1);
  }

  /**
   * @param {Object} entity Исходная сущность.
   *
   * @return {Select} Выражение для добавления состояния сущности.
   */
  static getInsertStatement(database, entity){
    return database
      .insert(this.extract(entity))
      .into(this.constructor.tableName);
  }

  /**
   * @param {Object} entity Исходная сущность.
   *
   * @return {Select} Выражение для обновления состояния сущности.
   */
  static getUpdateStatement(database, entity){
    return database
      .update(this.extract(entity))
      .from(this.constructor.tableName)
      .where('id', entity.id);
  }

  /**
   * @param {Object} entity Исходная сущность.
   *
   * @return {Select} Выражение для удаления состояния сущности.
   */
  static getDeleteStatement(database, entity){
    return database
      .delete()
      .from(this.constructor.tableName)
      .where('id', entity.id);
  }

  /**
   * @return {Class} Используемый класс конструктора запросов.
   */
  static get queryBuilder(){
    return QueryBuilder;
  }

  /**
   * @param {Knex} database Подключение к базе данных.
   */
  constructor(database){
    this.database = database;
  }

  /**
   * @param {Object} entity Исходная сущность.
   *
   * @return {Object} Данные для сохранения в базу данных.
   */
  extract(entity){
  }

  /**
   * @param {Object} data Строка базы данных.
   *
   * @return {Object} Восстановленная из строки сущность.
   */
  hydrate(data){
  }

  /**
   * @param {Array} rows Строки базы данных.
   *
   * @return {Generator} Текущая, восстановленная из строки сущность.
   */
  * hydrateAll(rows){
    for(let row of rows){
      yield this.hydrate(row);
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
      return this.constructor.getInsertStatement(this.database, entity).then();
    }
    else{
      return this.constructor.getUpdateStatement(this.database, entity).then();
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
    return this.constructor.getDeleteStatement(this.database, entity).then();
  }

  /**
   * @param {String} field Имя проверяемого поля.
   * @param {String} value Искомое значение.
   *
   * @return {Object|null} Сущность или null - если она не найдена.
   */
  async find(field, value){
    /*
    return new Promise(resolve => {
      this.constructor.getFindStatement(this.database, field, value)
        .then(resolve)
    });
    */
    return this.constructor.getFindStatement(this.database, field, value)
      .then((data) => {
        if(data.length == 0){
          return;
        }
    
        return this.hydrate(data[0]);
      });
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
