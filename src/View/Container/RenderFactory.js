const Mustache = require('mustache'),
  MustacheRender = require('../MustacheRender'),
  FileTemplateResolver = require('../FileTemplateResolver');

module.exports = class{
  async build(options, container){
    return new MustacheRender(
      Mustache,
      new FileTemplateResolver('./view', '.mustache'),
      await container.get('ViewHelpers').build({}, container)
    );
  }
};
