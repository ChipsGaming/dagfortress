module.exports = class{
  constructor(handler){
    this.handler = handler;
  }

  async check(task, condition){
    return this.handler.check(task, condition);
  }
};
