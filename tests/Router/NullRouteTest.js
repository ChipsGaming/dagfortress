var assert = require('assert'),
  NullRoute = require('../../src/Router/NullRoute');

describe('route', () => {
  it('Should return default values', () => {
    const defaults = {'foo': 'bar'},
      router = new NullRoute(defaults);

    assert.equal(defaults, router.route({}));
  });
});
