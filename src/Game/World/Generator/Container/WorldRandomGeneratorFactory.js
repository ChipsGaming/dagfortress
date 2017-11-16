const fs = require('fs');
const WorldRandomGenerator = require('../WorldRandomGenerator');

module.exports = class{
  build(options, container){
    return container.get('Config').build({}, container)
      .then(function(config){
        return new Promise(function(resolve){
          fs.readFile(config.game.world.randomGeneratorPath, 'utf8', function(err, data){
            if(err){
              throw new Error(err);
            }
        
            resolve(
              new WorldRandomGenerator(JSON.parse(data))
            );
          });
        });
      });
  }
};
