const Condition = require('../Protected');

module.exports = class{
  async build(options, container){
    return new Condition(
      await container.get('AllianceRepository').build({}, container),
      await container.get('GroupRepository').build({}, container),
      await container.get('LocationRepository').build({}, container),
      await container.get('DynamicRepository').build({}, container)
    );
  }
};
