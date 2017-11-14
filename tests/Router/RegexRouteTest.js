var assert = require('assert'),
  RegexRoute = require('../../src/Router/RegexRoute');

describe('route', function(){
  it('Should return matched values', function(){
    const router = new RegexRoute(
      /hello (\w+)/i,
      ['name']
    );
    const message = {
      content: 'hello user'
    };

    const match = router.route(message);

    assert.ok(match instanceof Object)
    assert.ok('name' in match)
    assert.equal('user', match.name);
  });

  it('Should extend default values', function(){
    const router = new RegexRoute(
      /hello (\w+)/i,
      ['name'],
      {id: 'hello'}
    );
    const message = {
      content: 'hello user'
    };

    const match = router.route(message);

    assert.equal('hello', match.id);
  });

  it('Should return NULL if not matched', function(){
    const router = new RegexRoute(
      /hello (\w+)/i,
      ['name']
    );
    const message = {
      content: 'hello'
    };

    const match = router.route(message);

    assert.ok(match === null)
  });
});
