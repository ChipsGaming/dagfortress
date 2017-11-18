const fs = require('fs');
const Util = require('util');

module.exports = class{
  async build(options, container){
    return JSON.parse(
      await Util.promisify(fs.readFile)(container.get('config_path'), 'utf8')
    );
  }
};
