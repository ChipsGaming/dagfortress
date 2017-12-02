module.exports = class{
  constructor(handler){
    this.handler = handler;
  }

  async run(dynamic, action, task, next){
    this.handler.run(dynamic, action, task, next);
  }
};
