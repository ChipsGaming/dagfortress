const Action = require('../Wait');

module.exports = class{
  async build(options, container){
    return new Action(
      await container.get('EventJournal').build({world: options.world}, container)
    );
  }
};
