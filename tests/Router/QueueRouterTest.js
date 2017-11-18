var assert = require('assert'),
  QueueRoute = require('../../src/Router/QueueRoute'),
  RegexRoute = require('../../src/Router/RegexRoute');

describe('route', () => {
  it('Should return first matched values', () => {
    const router = new QueueRoute([
      new RegexRoute(
        /foo (\w+)/i,
        ['name'],
        {id: 'foo'}
      ),
      new RegexRoute(
        /bar (\w+)/i,
        ['name'],
        {id: 'bar'}
      )
    ]);
    const message = {
      content: 'bar user'
    };

    const match = router.route(message);

    assert.equal('bar', match.id);
  });

  it('Should return NULL if not matched', () => {
    const router = new QueueRoute([
      new RegexRoute(
        /foo (\w+)/i,
        ['name'],
        {id: 'foo'}
      ),
      new RegexRoute(
        /bar (\w+)/i,
        ['name'],
        {id: 'bar'}
      )
    ]);
    const message = {
      content: 'baz user'
    };

    const match = router.route(message);

    assert.ok(match === null)
  });
});
