var assert = require('assert'),
  sinon = require('sinon'),
  Container = require('../../src/Container/Container');

describe('constructor', () => {
  it('Get default services', () => {
    const container = new Container({'foo': 'bar'});

    assert.ok(container.has('foo'));
  });
});

describe('has', () => {
  it('Should expect service', () => {
    const container = new Container({'foo': 'bar'});

    assert.equal(true, container.has('foo'));
    assert.equal(false, container.has('foz'));
  });

  it('Should delegate expection parent', function(){
    const container = new Container(
      {'foo': 'bar'},
      new Container({'foz': 'baz'})
    );

    assert.equal(true, container.has('foo'));
    assert.equal(true, container.has('foz'));
  });
});

describe('get', () => {
  it('Should return service', () => {
    const container = new Container({'foo': 'bar'});

    assert.equal('bar', container.get('foo'));
  });

  it('Should throw exception if service not set', (done) => {
    const container = new Container;
  
    try{
      container.get('foo');
      done('Error was expected');
    }
    catch(err){
      done();
    }
  });

  it('Should delegate parent', () => {
    const container = new Container(
      {'foo': 'bar'},
      new Container({'foz': 'baz'})
    );

    assert.equal('bar', container.get('foo'));
    assert.equal('baz', container.get('foz'));
  })
});

describe('set', () => {
  it('Should set service', () => {
    const container = new Container;

    assert.equal(false, container.has('foo'));

    container.set('foo', 'bar');
    assert.equal('bar', container.get('foo'));
  });
});
