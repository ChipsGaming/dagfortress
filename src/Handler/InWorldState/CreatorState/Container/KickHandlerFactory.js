const Handler = require('../KickHandler');

module.exports = class{
  async build(options, container){
    return new Handler(
      options.player,
      await container.get('PlayerRepository').build({}, container)
    );
  }
};
