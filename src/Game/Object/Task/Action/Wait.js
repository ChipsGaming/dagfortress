module.exports = class{
  constructor(globalEvents){
    this.globalEvents = globalEvents;
  }

  async run(dynamic, action, task, next){
    dynamic.wait(this.globalEvents);
  }
};
