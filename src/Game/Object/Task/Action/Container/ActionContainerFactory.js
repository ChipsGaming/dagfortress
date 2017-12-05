const Container = require('../../../../../Container/Container'),
  SharingFactory = require('../../../../../Container/Factory/SharingFactory');
  InvokableFactory = require('../../../../../Container/Factory/InvokableFactory');

module.exports = class{
  async build(options, container){
    return new Container({
      'custom': new (require('./CustomFactory')),
      'wait': new (require('./WaitFactory')),
      'protect': new SharingFactory(new (require('./ProtectFactory'))),
      'move': new SharingFactory(new (require('./MoveFactory')))
    }, container);
  }
};
