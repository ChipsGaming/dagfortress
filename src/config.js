const fs = require('fs');

module.exports = class{
  build(options, container){
    return new Promise(function(resolve, reject){
      fs.readFile(container.get('config_path'), 'utf8', function(err, data){
        if(err){
          throw new Error(err);
        }
    
        resolve(JSON.parse(data));
      }.bind(this));
    }.bind(this));
  }
};
