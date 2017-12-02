const assert = require('assert'),
  Mustache = require('mustache'),
  MustacheRender = require('../../src/View/MustacheRender'),
  FileTemplateResolver = require('../../src/View/FileTemplateResolver'),
  ViewModel = require('../../src/View/ViewModel');

describe('render', () => {
  it('Should render view model', async () => {
    const render = new MustacheRender(
      Mustache,
      new FileTemplateResolver(__dirname + '/fixtures')
    ),
      viewModel = new ViewModel('mustache_template', {
        name: 'user'
      });

    assert.equal(
      "Hello, user\n",
      await render.render(viewModel.templateName, viewModel.model)
    );
  });

  it('Should render children', async () => {
    const render = new MustacheRender(
      Mustache,
      new FileTemplateResolver(__dirname + '/fixtures')
    ),
      viewModel = new ViewModel('parent.mustache', {
        child: new ViewModel('mustache_template', {
          name: 'user'
        })
      });

    assert.equal(
      "Hello, user\n\nParent content\n",
      await viewModel.render(render)
    );
  });
});
