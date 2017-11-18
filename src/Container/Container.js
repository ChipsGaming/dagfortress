/**
 * Контейнер служб.
 *
 * @example
 * const container = new Container({
 *   'config': {...}
 * });
 * const config = container.get('config');
 *
 * @author Artur Sh. Mamedbekov
 */
module.exports = class{
  /**
   * @param {Object} services [optional] Службы.
   * @param {Container} parent [optional] Родительский контейнер.
   */
  constructor(services = {}, parent = null){
    this.services = services;
    this.parent = parent;
  }

  /**
   * Добавляет службу в контейнер.
   *
   * @param {String} id Идентификатор службы.
   * @param {Object} service Служба.
   */
  set(id, service){
    this.services[id] = service;
  }

  /**
   * Проверяет наличие службы в контейнере.
   *
   * @param {String} id Идентификатор службы.
   *
   * @return {Boolean} true - если служба существует.
   */
  has(id){
    if(id in this.services){
      return true;
    }
    if(this.parent !== null){
      return this.parent.has(id);
    }

    return false;
  }

  /**
   * Предоставляет службу, если она была добавлена в контейнер.
   *
   * @param {String} id Идентификатор службы.
   *
   * @throws Error Выбрасывается, если запрашиваемая служба не установлена в 
   * контейнере.
   *
   * @return {Object} Служба.
   */
  get(id){
    if(!this.has(id)){
      throw new Error(`Service "${id}" not found`);
    }

    if(id in this.services){
      return this.services[id];
    }
    else{
      return this.parent.get(id);
    }
  }
};
