const fs = require('fs');
const LocationRandomGenerator = require('../LocationRandomGenerator');

module.exports = class{
  build(options, container){
    return container.get('Config').build({}, container)
      .then(function(config){
        return new Promise(function(resolve){
          fs.readFile(config.game.world.location.randomGeneratorPath, 'utf8', function(err, data){
            if(err){
              throw new Error(err);
            }
        
            resolve(
              new LocationRandomGenerator(JSON.parse(data))
            );
          });
        });
      });
  }
};
