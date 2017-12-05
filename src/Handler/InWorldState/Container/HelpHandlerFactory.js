const Handler = require('../HelpHandler');

module.exports = class{
  async build(options, container){
    return new Handler(
      options.player
    );
  }
};
