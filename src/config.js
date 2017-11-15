const fs = require('fs');
const Util = require('util');

module.exports = {
  async build(options, container){
    try {
      const fsAsync = Util.promisify(fs.readFile);
      const data = await fsAsync(container.get('config_path'), 'utf8');
      return JSON.parse(data);
    } catch(err) {
      throw err;
    }
  }
};
