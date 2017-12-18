const Container = require('../../../../../Container/Container'),
  SharingFactory = require('../../../../../Container/Factory/SharingFactory');
  InvokableFactory = require('../../../../../Container/Factory/InvokableFactory');

module.exports = class{
  async build(options, container){
    return new Container({
      'custom': new (require('./CustomFactory')),
      'not': new SharingFactory(new (require('./NotFactory'))),
      'false': new SharingFactory(new InvokableFactory(require('../False'))),
      'day': new SharingFactory(new InvokableFactory(require('../Day'))),
      'protected': new SharingFactory(new (require('./ProtectedFactory'))),
      'inLocation': new SharingFactory(new (require('./InLocationFactory'))),
      'die': new SharingFactory(new (require('./DieFactory'))),
      'allianceDie': new SharingFactory(new (require('./AllianceDieFactory'))),
      'groupDie': new SharingFactory(new (require('./GroupDieFactory')))
    }, container);
  }
};
