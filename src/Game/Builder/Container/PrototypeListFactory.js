const PrototypeList = require('../PrototypeList');

module.exports = class{
  async build(options, container){
    return new PrototypeList(__dirname + '/../../../../config/prototypes');
  }
};
