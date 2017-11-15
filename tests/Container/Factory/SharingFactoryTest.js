var assert = require('assert'),
  sinon = require('sinon'),
  SharingFactory = require('../../../src/Container/Factory/SharingFactory');

describe('build', function(){
  it('Should cached service', function(){
    const spy = sinon.spy(),
      factory = new SharingFactory({
        build: function(){
          return new Promise(function(resolve, reject){
            spy();
            resolve('bar');
          });
        }
      });

    factory.build()
      .then(function(service){
        assert.equal(1, spy.callCount);
        assert.equal('bar', service);

        return factory.build();
      })
      .then(function(service){
        assert.equal(1, spy.callCount);
        assert.equal('bar', service);
      });
  });
});
