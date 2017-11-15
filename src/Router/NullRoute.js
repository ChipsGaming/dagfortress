/**
 * Роутер, соответствующий любому сообщению и возвращающий заданный результат.
 *
 * @author Artur Sh. Mamedbekov
 */
module.exports = class{
  /**
   * @param {Object} defaults [optional] Результаты по умолчанию.
   */
  constructor(defaults = {}){
    this.defaults = defaults;
  }

  /**
   * Роутит сообщение.
   *
   * @param {Discord.Message} message Разбираемое сообщение.
   *
   * @return {Object} Результат по умолчанию.
   */
  route(message){
    return this.defaults;
  }
};
