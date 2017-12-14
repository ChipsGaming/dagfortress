const Condition = require('../Not');

module.exports = class{
  async build(options, container){
    return new Condition(
      container
    );
  }
};
