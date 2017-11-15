/**
 * Очередь роутеров, использующая первый удачный разбор для возврата результата.
 *
 * @example
 * const router = new QueueRoute([
 *   new RegexRoute(/^help (\w+)$/i, ['section'], {
 *     handler: new HelpHandler
 *   }),
 *   new NullRoute({
 *     handler: new NullHandler
 *   })
 * ])
 *  .route(message);
 *
 * @author Artur Sh. Mamedbekov
 */
module.exports = class{
  /**
   * @param {Array} routers Входящие в очередь роутеры.
   */
  constructor(routers){
    this.routers = routers;
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
    for(let i in this.routers){
      let match = this.routers[i].route(message);
      if(match === null){
        continue;
      }

      return match;
    }

    return null;
  }
};
