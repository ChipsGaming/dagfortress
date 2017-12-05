const Handler = require('../PingHandler');

module.exports = class{
  async build(options, container){
    return new Handler(
      options.player
    );
  }
};
