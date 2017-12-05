const Handler = require('../InWorldStateHandler');

module.exports = class{
  async build(options, container){
    return new Handler(
      await container.get('HandlersContainer').build({}, container),
      options.player
    );
  }
};
