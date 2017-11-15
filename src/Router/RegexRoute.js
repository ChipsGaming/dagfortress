/**
 * Роутер на регулярных выражениях.
 *
 * @example
 * const router = new RegexRoute(/^help (\w+)$/i, ['section'], {
 *   handler: new HelpHandler
 * })
 *  .route(message);
 *
 * @author Artur Sh. Mamedbekov
 */
module.exports = class{
  /**
   * @param {RegExp} regex Используемое для разбора регулярное выражение.
   * @param {Array} names Массив имен групп регулярного выражения.
   * @param {Object} defaults [optional] Результаты по умолчанию.
   */
  constructor(regex, names, defaults = {}){
    this.regex = regex;
    this.names = names;
    this.defaults = defaults;
  }

  /**
   * Роутит сообщение.
   *
   * @param {Discord.Message} message Разбираемое сообщение.
   *
   * @return {Object|null} Результат роутинга или null - если сообщения не 
   * соответствует правилам разбора.
   */
  route(message){
    if(!('content' in message)){
      return null;
    }

    const match = this.regex.exec(message.content);
    if(match === null){
      return null;
    }

    let result = {};
    for(let i in this.names){
      result[this.names[i]] = match[parseInt(i) + 1];
    }

    return Object.assign(this.defaults, result);
  }
};
