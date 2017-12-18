const Condition = require('../AllianceDie');

module.exports = class{
  async build(options, container){
    return new Condition(
      await container.get('AllianceRepository').build({}, container),
      await container.get('GroupRepository').build({}, container),
      await container.get('DynamicRepository').build({}, container)
    );
  }
};
