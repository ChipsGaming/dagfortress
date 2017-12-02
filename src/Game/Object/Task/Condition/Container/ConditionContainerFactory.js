const Container = require('../../../../../Container/Container'),
  SharingFactory = require('../../../../../Container/Factory/SharingFactory');
  InvokableFactory = require('../../../../../Container/Factory/InvokableFactory');

module.exports = class{
  async build(options, container){
    return new Container({
      'custom': new (require('./CustomFactory')),
      'false': new SharingFactory(new InvokableFactory(require('../False'))),
      'protected': new SharingFactory(new (require('./ProtectedFactory'))),
      'inLocation': new SharingFactory(new (require('./InLocationFactory')))
    }, container);
  }
};
