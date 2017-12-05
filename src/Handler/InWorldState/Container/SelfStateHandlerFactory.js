const Handler = require('../SelfStateHandler');

module.exports = class{
  async build(options, container){
    return new Handler(
      options.player
    );
  }
};
