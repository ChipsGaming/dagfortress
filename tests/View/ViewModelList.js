const assert = require('assert'),
  Mustache = require('mustache'),
  MustacheRender = require('../../src/View/MustacheRender'),
  FileTemplateResolver = require('../../src/View/FileTemplateResolver'),
  ViewModelList = require('../../src/View/ViewModelList'),
  ViewModel = require('../../src/View/ViewModel');

describe('render', () => {
  it('Should render views list', async () => {
    const render = new MustacheRender(
      Mustache,
      new FileTemplateResolver(__dirname + '/fixtures')
    ),
      viewModelList = new ViewModelList([
        new ViewModel('mustache_template', {
          name: 'user'
        }),
        new ViewModel('mustache_template', {
          name: 'user'
        })
      ], '-');

    assert.equal(
      "Hello, user\n-Hello, user\n",
      await viewModelList.render(render)
    );
  });
});
