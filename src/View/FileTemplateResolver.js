const fs = require('fs');

module.exports = class{
  constructor(path, extension = ''){
    this.path = path;
    this.extension = extension;
  }

  resolve(templateName){
    return new Promise(function(resolve, reject){
      fs.readFile(`${this.path}/${templateName}${this.extension}`, 'utf8', function(err, template){
        if(err){
          throw new Error(err);
        }
    
        resolve(template);
      });
    }.bind(this));
  }
};
