const assert = require('assert'),
  Mustache = require('mustache'),
  MustacheRender = require('../../src/View/MustacheRender'),
  FileTemplateResolver = require('../../src/View/FileTemplateResolver'),
  ViewModel = require('../../src/View/ViewModel');

describe('render', function(){
  it('Should render view model', function(){
    const render = new MustacheRender(
      Mustache,
      new FileTemplateResolver(__dirname + '/fixtures')
    ),
      viewModel = new ViewModel('mustache_template', {
        name: 'user'
      });

    render.render(viewModel)
      .then(function(result){
        assert.equal("Hello, user\n", result);
      });
  });
});
