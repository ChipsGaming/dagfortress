var assert = require('assert'),
  sinon = require('sinon'),
  Container = require('../../src/Container/Container');

describe('constructor', function(){
  it('Get default services', function(){
    const container = new Container({'foo': 'bar'});

    assert.ok(container.has('foo'));
  });
});

describe('get', function(){
  it('Should return service', function(){
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

describe('set', function(){
  it('Should set service', function(){
    const container = new Container;

    assert.equal(false, container.has('foo'));

    container.set('foo', 'bar');
    assert.equal('bar', container.get('foo'));
  });
});
