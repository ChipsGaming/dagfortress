const fs = require('fs');
const Util = require('util');

module.exports = class{
  constructor(path, extension = ''){
    this.path = path;
    this.extension = extension;
  }

  async resolve(templateName){
    return Util.promisify(fs.readFile)(`${this.path}/${templateName}${this.extension}`, 'utf8');
  }
};
