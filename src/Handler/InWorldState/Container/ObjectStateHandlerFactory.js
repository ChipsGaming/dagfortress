const Handler = require('../ObjectStateHandler');

module.exports = class{
  async build(options, container){
    return new Handler(
      options.player,
      await container.get('DynamicRepository').build({}, container)
    );
  }
};
