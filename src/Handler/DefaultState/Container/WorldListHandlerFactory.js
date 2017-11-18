const WorldListHandler = require('../WorldListHandler');

module.exports = class{
  async build(options, container){
    return new WorldListHandler(
      await container.get('WorldRepository').build({}, container)
    );
  }
};
