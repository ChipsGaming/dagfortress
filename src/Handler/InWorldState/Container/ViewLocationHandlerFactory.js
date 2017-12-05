const Handler = require('../ViewLocationHandler');

module.exports = class{
  async build(options, container){
    return new Handler(
      options.player,
      await container.get('WorldRepository').build({}, container)
    );
  }
};
