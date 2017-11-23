const ProtectTask = require('../ProtectTask');

module.exports = class{
  async build(options, container){
    return new ProtectTask(
      await container.get('AIContainer').build({}, container),
      await container.get('AllianceRepository').build({}, container),
      await container.get('GroupRepository').build({}, container),
      await container.get('DynamicRepository').build({}, container)
    );
  }
};
