module.exports = class{
  constructor(target){
    this.target = target;
  }

  async build(options, container){
    return new this.target;
  }
};
