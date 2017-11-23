const Attack = require('../Attack');

module.exports = class{
  async build(options, container){
    return new Attack(
      options.dynamic,
      await container.get('OrganRepository').build({}, container)
    );
  }
};
