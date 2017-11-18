var assert = require('assert'),
  sinon = require('sinon'),
  Container = require('../../src/Container/Container');

describe('constructor', () => {
  it('Get default services', () => {
    const container = new Container({'foo': 'bar'});

    assert.ok(container.has('foo'));
  });
});

describe('get', () => {
  it('Should return service', () => {
    const container = new Container({'foo': 'bar'});

    assert.equal('bar', container.get('foo'));
  });

  it('Should throw exception if service not set', function(done){
    const container = new Container;
  
    try{
      container.get('foo');
      done('Error was expected');
    }
    catch(err){
      done();
    }
  });
});

describe('set', () => {
  it('Should set service', () => {
    const container = new Container;

    assert.equal(false, container.has('foo'));

    container.set('foo', 'bar');
    assert.equal('bar', container.get('foo'));
  });
});
