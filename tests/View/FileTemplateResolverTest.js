var assert = require('assert'),
  FileTemplateResolver = require('../../src/View/FileTemplateResolver');

describe('resolve', function(){
  it('Should resolve template by name', function(){
    const resolver = new FileTemplateResolver(
      __dirname + '/fixtures',
      '.mustache'
    );

    resolver.resolve('file_template')
      .then(function(template){
        assert.equal("Hello world\n", template);
      });
  });
});
