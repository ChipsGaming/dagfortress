const Container = require('../../../../../Container/Container'),
  SharingFactory = require('../../../../../Container/Factory/SharingFactory');

module.exports = class{
  async build(options, container){
    return new Container({
      'default': new (require('../Default/Container/DefaultAIFactory'))
    }, container);
  }
};
