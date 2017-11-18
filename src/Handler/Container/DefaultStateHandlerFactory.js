const DefaultStateHandler = require('../DefaultStateHandler');

module.exports = class{
  async build(options, container){
    return new DefaultStateHandler(
      await container.get('HandlersContainer').build({}, container)
    );
  }
};
