const Container = require('../../../../Container/Container'),
  SharingFactory = require('../../../../Container/Factory/SharingFactory');
  InvokableFactory = require('../../../../Container/Factory/InvokableFactory');

module.exports = class{
  async build(options, container){
    return new Container({
      'null': new SharingFactory(new InvokableFactory(require('../NullTask'))),
      'protect': new SharingFactory(new (require('./ProtectTaskFactory'))),
      'move': new SharingFactory(new (require('./MoveTaskFactory'))),
      'moveAndAttack': new SharingFactory(new (require('./MoveAndAttackTaskFactory')))
    }, container);
  }
};
