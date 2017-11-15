module.exports = class{
  /**
   * @param {Knex} database Подключение к базе данных.
   */
  constructor(database){
    this.database = database;
  }

  /**
   * @return {String} Наименование таблицы в базе данных.
   */
  get tableName(){
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
  save(entity){
    if(this.isNew(entity)){
      return this.database
        .insert(this.extract(entity))
        .into(this.tableName);
    }
    else{
      return this.database
        .update(this.extract(entity))
        .from(this.tableName)
        .where('id', entity.id);
    }
  }

  /**
   * Удаляет состояние сущности из базы данных.
   *
   * @param {Object} entity Удаляемая сущность.
   *
   * @return {Promise}
   */
  remove(entity){
    return this.database
      .delete()
      .from(this.tableName)
      .where('id', entity.id);
  }

  /**
   * @param {String} field Имя проверяемого поля.
   * @param {String} value Искомое значение.
   *
   * @return {Object|null} Сущность или null - если она не найдена.
   */
  find(field, value){
    return this.database
      .select('*')
      .from(this.tableName)
      .where(field, value)
      .limit(1)
      .then(function(data){
        if(data.length == 0){
          return null;
        }

        return this.hydrate(data[0]);
      }.bind(this));
  }

  /**
   * @return {Knex} Конструктор запросов.
   */
  select(){
    return this.database
      .select()
      .from(this.tableName);
  }
};
