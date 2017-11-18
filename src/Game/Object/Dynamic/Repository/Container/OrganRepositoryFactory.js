const Repository = require('../OrganRepository');

module.exports = class{
  async build(options, container){
    return new Repository(
      await container.get('Database').build({}, container)
    );
  }
};
