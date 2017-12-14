const Condition = require('../Die');

module.exports = class{
  async build(options, container){
    return new Condition(
      await container.get('DynamicRepository').build({}, container)
    );
  }
};
