const Reward = require('../Win');

module.exports = class{
  async build(options, container){
    return new Reward(container);
  }
};
