const ViewModel = require('../../View/ViewModel');

module.exports = class{
  async process(message, next){
    return new ViewModel('in_world_state/help');
  }
};
