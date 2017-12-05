const Handler = require('../ExitWorldHandler');

module.exports = class{
  async build(options, container){
    return new Handler(
      options.player,
      await container.get('WorldRepository').build({}, container),
      await container.get('PlayerRepository').build({}, container)
    );
  }
};
