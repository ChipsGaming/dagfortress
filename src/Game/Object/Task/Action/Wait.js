const WaitEvent = require('../../Dynamic/Event/WaitEvent');

module.exports = class{
  constructor(globalEvents){
    this.globalEvents = globalEvents;
  }

  async run(dynamic, action, task, next){
    this.globalEvents(new WaitEvent(
      dynamic
    ));
  }
};
