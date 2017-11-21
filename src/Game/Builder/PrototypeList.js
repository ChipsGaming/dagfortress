const fs = require('fs');
const Util = require('util');

module.exports = class{
  /**
   * @param {String} prototipesDir Адрес каталога прототипов.
   */
  constructor(prototipesDir){
    this.prototipesDir = prototipesDir;
  }

  /**
   * @param {String} name Наименование прототипа.
   *
   * @return {Boolean} true - если прототип существует.
   */
  has(name){
    return fs.existsSync(`${this.prototipesDir}/${name}.json`);
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

    return JSON.parse(
      await Util.promisify(fs.readFile)(`${this.prototipesDir}/${name}.json`, 'utf8')
    );
  }
};
