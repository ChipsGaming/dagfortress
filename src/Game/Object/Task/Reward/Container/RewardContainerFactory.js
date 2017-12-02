const Container = require('../../../../../Container/Container'),
  SharingFactory = require('../../../../../Container/Factory/SharingFactory');
  InvokableFactory = require('../../../../../Container/Factory/InvokableFactory');

module.exports = class{
  async build(options, container){
    return new Container({
      'win': new SharingFactory(new (require('./WinFactory'))),
    }, container);
  }
};
