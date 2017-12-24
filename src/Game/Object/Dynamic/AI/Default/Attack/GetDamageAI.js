module.exports = class{
  static async factory(options, container){
    return new this;
  }

  async process(dynamic){
    if(Math.random() < 0.5){
      return 0;
    }
    else{
      return Math.floor(Math.random() * 3);
    }
  }
};
