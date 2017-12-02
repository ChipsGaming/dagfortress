const Uuid = require('uuid/v4');

module.exports = class{
  /**
   * @param {String} name Наименование события.
   * @param {Object} publisher Источник события.
   * @param {Object} data [optional] Дополнительные данные о событии.
   */
  constructor(name, publisher, data = {}){
    this.id = Uuid();
    this.name = name;
    this.publisher = publisher;
    this.data = data;
  }
};
