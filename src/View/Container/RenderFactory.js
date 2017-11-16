const Mustache = require('mustache'),
  MustacheRender = require('../MustacheRender'),
  FileTemplateResolver = require('../FileTemplateResolver');

module.exports = class{
  build(options, container){
    return new Promise(function(resolve, reject){
      resolve(
        new MustacheRender(
          Mustache,
          new FileTemplateResolver('./view', '.mustache')
        )
      );
    });
  }
};
