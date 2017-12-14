const Condition = require('../AllPlayersDie');

module.exports = class{
  async build(options, container){
    return new Condition(
      await container.get('PlayerRepository').build({}, container)
    );
  }
};
