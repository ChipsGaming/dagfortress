var assert = require('assert'),
  FileTemplateResolver = require('../../src/View/FileTemplateResolver');

describe('resolve', () => {
  it('Should resolve template by name', async () => {
    const resolver = new FileTemplateResolver(
      __dirname + '/fixtures',
      '.mustache'
    );

    assert.equal("Hello world\n", await resolver.resolve('file_template'));
  });
});
