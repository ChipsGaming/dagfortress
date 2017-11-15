var assert = require('assert'),
  NullRoute = require('../../src/Router/NullRoute');

describe('route', function(){
  it('Should return default values', function(){
    const defaults = {'foo': 'bar'},
      router = new NullRoute(defaults);

    assert.equal(defaults, router.route({}));
  });
});
