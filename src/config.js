const fs = require('fs');
const Util = require('util');

module.exports = class{
  async build(options, container){
    try {
      return JSON.parse(
        await Util.promisify(fs.readFile)(container.get('config_path'), 'utf8')
      );
    } catch(err) {
      throw err;
    }
  }
};
