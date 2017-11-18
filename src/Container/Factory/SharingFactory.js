/**
 * Кеширующая фабрика.
 *
 * @example
 * const container = new Container({
 *   'config': new SharingFactory({
 *     build: function(options){
 *       return new Promise(() => { ... });
 *     }
 *   })
 * });
 * container.get('config').build({path: "..."})
 *   .then(function(config){
 *     ...
 *   });
 * // Not call factory, using sharing service
 * container.get('config').build({path: "..."})
 *   .then(function(config){
 *     ...
 *   });
 *
 * @author Artur Sh. Mamedbekov
 */
module.exports = class{
  /**
   * @param {Factory} factory Исходная фабрика.
   */
  constructor(factory){
    this.factory = factory;
    this.instance = null;
  }

  /**
   * Отчищает кеш фабрики.
   */
  clean(){
    this.instance = null;
  }

  /**
   * Выполняет сборку службы, кешируя ее после этого.
   *
   * @param {Object} options Опции сборки.
   * 
   * @return {Promise}
   */
  async build(options, container){
    if(this.instance === null){
      this.instance = await this.factory.build(options, container);
    }

    return this.instance;
  }
};
