module.exports = class{
  /**
   * @param {Object} services Сервисы.
   */
  constructor(services){
    if(!(services instanceof Object)){
      services = {};
    }

    this.services = services;
  }

  /**
   * @param {String} id Идентификатор службы.
   * @param {Object} service Служба.
   */
  set(id, service){
    this.services[id] = service;
  }

  /**
   * @param {String} id Идентификатор службы.
   *
   * @return {Boolean} true - если сервис существует.
   */
  has(id){
    return id in this.services;
  }

  /**
   * @param {String} id Идентификатор службы.
   *
   * @return {Object} Сервис.
   */
  get(id){
    if(!this.has(id)){
      throw new Error(`Service "${id}" not found`);
    }

    return this.services[id];
  }
};
