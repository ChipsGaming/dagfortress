module.exports = class{
  constructor(handler){
    this.handler = handler;
  }

  async check(task, condition, view){
    return this.handler.check(task, condition);
  }
};
