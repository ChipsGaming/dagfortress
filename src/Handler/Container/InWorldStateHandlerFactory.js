const InWorldStateHandler = require('../InWorldStateHandler');

module.exports = class{
  async build(options, container){
    return new InWorldStateHandler(
      await container.get('HandlersContainer').build({}, container),
      options.player
    );
  }
};
