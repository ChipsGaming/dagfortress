const Container = require('../../Container/Container'),
  SharingFactory = require('../../Container/Factory/SharingFactory');
  InvokableFactory = require('../../Container/Factory/InvokableFactory');

module.exports = class{
  async build(options, container){
    return new Container({
      'NullHandler': new SharingFactory(new InvokableFactory(require('../NullHandler'))),

      // DefaultState
      'DefaultState/PingHandler': new SharingFactory(new InvokableFactory(require('../DefaultState/PingHandler'))),
      'DefaultState/HelpHandler': new SharingFactory(new InvokableFactory(require('../DefaultState/HelpHandler'))),
      'DefaultState/WorldListHandler': new SharingFactory(new (require('../DefaultState/Container/WorldListHandlerFactory'))),
      'DefaultState/EnterWorldHandler': new SharingFactory(new (require('../DefaultState/Container/EnterWorldHandlerFactory'))),
      'DefaultState/CreateWorldHandler': new SharingFactory(new (require('../DefaultState/Container/CreateWorldHandlerFactory'))),

      // InWorldState
      'InWorldState/PingHandler': new SharingFactory(new InvokableFactory(require('../InWorldState/PingHandler'))),
      'InWorldState/HelpHandler': new SharingFactory(new InvokableFactory(require('../InWorldState/HelpHandler'))),
      'InWorldState/EnterLocationHandler': new (require('../InWorldState/Container/EnterLocationHandlerFactory')),
      'InWorldState/ExitWorldHandler': new (require('../InWorldState/Container/ExitWorldHandlerFactory')),
      'InWorldState/ViewLocationHandler': new (require('../InWorldState/Container/ViewLocationHandlerFactory')),
      'InWorldState/AttackHandler': new (require('../InWorldState/Container/AttackHandlerFactory'))
    }, container);
  }
};
