const fs = require('fs');
const Util = require('util');

module.exports = class{
  /**
   * @param {String} prototypesDir Адрес каталога прототипов.
   */
  constructor(prototypesDir){
    this.prototypesDir = prototypesDir;
  }

  /**
   * @param {String} name Наименование прототипа.
   *
   * @return {Boolean} true - если прототип существует.
   */
  has(name){
    return fs.existsSync(`${this.prototypesDir}/${name}/index.js`);
  }

  /**
   * @param {String} name Наименование прототипа.
   *
   * @return {Object|null} Прототип или null - если прототип не найден.
   */
  async get(name){
    if(!this.has(name)){
      return null;
    }

    return require(`${this.prototypesDir}/${name}/index.js`);
  }
};
