const AttackHandler = require('../AttackHandler');

module.exports = class{
  async build(options, container){
    return new AttackHandler(
      options.player,
      await container.get('PlayerRepository').build({}, container)
    );
  }
};