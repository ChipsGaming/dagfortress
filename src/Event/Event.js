module.exports = class{
  /**
   * @param {String} name Наименование события.
   * @param {Object} data [optional] Дополнительные данные о событии.
   */
  constructor(name, data = {}){
    this.name = name;
    this.data = data;
  }
};
