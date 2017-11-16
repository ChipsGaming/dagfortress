const ViewModel = require('../../View/ViewModel');

module.exports = class{
  process(message){
    return new ViewModel('default_state/help');
  }
};
