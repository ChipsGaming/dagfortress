const Handler = require('../TaskListHandler');

module.exports = class{
  async build(options, container){
    return new Handler(
      options.player
    );
  }
};
