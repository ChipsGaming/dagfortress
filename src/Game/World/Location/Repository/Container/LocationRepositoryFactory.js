const Repository = require('../LocationRepository');

module.exports = class{
  build(options, container){
    return container.get('Database').build({}, container)
      .then(function(db){
        return new Repository(db);
      });
  }
};
