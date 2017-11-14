var assert = require('assert'),
  sinon = require('sinon'),
  Factory = require('../../../src/Container/Factory/Factory');

describe('build', function(){
  it('Should use callback function for build service', function(){
    const spy = sinon.spy(),
      factory = new Factory(spy),
      options = {'foo': 'bar'};
    
    factory.build(options);

    assert.ok(spy.calledOnce);
    assert.ok(spy.withArgs(options));
  });
});
