const PingHandler = require('../PingHandler');

module.exports = class{
  async build(options, container){
    return new PingHandler(
      options.player
    );
  }
};
