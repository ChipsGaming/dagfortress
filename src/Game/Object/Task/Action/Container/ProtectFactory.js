const Action = require('../Protect');

module.exports = class{
  async build(options, container){
    return new Action(
      await container.get('EventJournal').build({world: options.world}, container),
      await container.get('AllianceRepository').build({}, container),
      await container.get('GroupRepository').build({}, container),
      await container.get('DynamicRepository').build({}, container)
    );
  }
};
