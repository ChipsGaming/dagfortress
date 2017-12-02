module.exports = class{
  constructor(handler){
    this.handler = handler;
  }

  async reward(task, reward){
    return this.handler.reward(task, reward);
  }
};
