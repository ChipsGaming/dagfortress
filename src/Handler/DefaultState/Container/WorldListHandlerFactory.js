const Handler = require('../WorldListHandler');

module.exports = class{
  async build(options, container){
    return new Handler(
      await container.get('WorldRepository').build({}, container)
    );
  }
};
