const ViewModel = require('../../View/ViewModel');

module.exports = class{
  async process(message){
    return new ViewModel('default_state/help');
  }
};
