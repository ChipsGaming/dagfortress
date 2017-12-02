const GameEvent = require('../../../Event/GameEvent');

module.exports = class extends GameEvent{
  constructor(publisher){
    super('Wait', publisher);
  }

  apply(worldState){
  }
};
