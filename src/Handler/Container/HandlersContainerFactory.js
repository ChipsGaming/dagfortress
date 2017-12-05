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
      'InWorldState/PingHandler': new (require('../InWorldState/Container/PingHandlerFactory')),
      'InWorldState/HelpHandler': new (require('../InWorldState/Container/HelpHandlerFactory')),
      'InWorldState/TaskListHandler': new (require('../InWorldState/Container/TaskListHandlerFactory')),
      'InWorldState/ExitWorldHandler': new (require('../InWorldState/Container/ExitWorldHandlerFactory')),
      'InWorldState/ViewLocationHandler': new (require('../InWorldState/Container/ViewLocationHandlerFactory')),
      'InWorldState/SelfStateHandler': new (require('../InWorldState/Container/SelfStateHandlerFactory')),
      'InWorldState/ObjectStateHandler': new (require('../InWorldState/Container/ObjectStateHandlerFactory')),
      // --ActionState
      'InWorldState/ActionHandler': new (require('../InWorldState/Container/ActionHandlerFactory')),
      'InWorldState/ActionState/WaitHandler': new (require('../InWorldState/ActionState/Container/WaitHandlerFactory')),
      'InWorldState/ActionState/EnterLocationHandler': new (require('../InWorldState/ActionState/Container/EnterLocationHandlerFactory')),
      'InWorldState/ActionState/AttackHandler': new (require('../InWorldState/ActionState/Container/AttackHandlerFactory')),
      // --CreatorState
      'InWorldState/CreatorState/KickHandler': new (require('../InWorldState/CreatorState/Container/KickHandlerFactory')),
      'InWorldState/CreatorState/ResetHandler': new (require('../InWorldState/CreatorState/Container/ResetHandlerFactory'))
    }, container);
  }
};
