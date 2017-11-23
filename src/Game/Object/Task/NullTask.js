module.exports = class{
  async check(task){
    return false;
  }

  async run(dynamic, task){
    dynamic.currentEndurance = 0;
  }
};
