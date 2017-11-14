const fs = require('fs');

module.exports = class{
  constructor(){
    this.instance = null;
  }

  build(path){
    return new Promise(function(resolve, reject){
      if(this.instance === null){
        fs.readFile(path, 'utf8', function(err, data){
          if(err){
            throw new Error(err);
          }
      
          this.instance = JSON.parse(data);
          resolve(this.instance);
        }.bind(this));
        return;
      }
      
      resolve(this.instance);
    }.bind(this));
  }
};
