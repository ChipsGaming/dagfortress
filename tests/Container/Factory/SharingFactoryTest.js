var assert = require('assert'),
  sinon = require('sinon'),
  SharingFactory = require('../../../src/Container/Factory/SharingFactory');

describe('build', () => {
  it('Should cached service', async () => {
    const spy = sinon.spy(),
      factory = new SharingFactory({
        build: () => {
          return new Promise((resolve, reject) => {
            spy();
            resolve('bar');
          });
        }
      });

    let service = await factory.build();
    assert.equal(1, spy.callCount);
    assert.equal('bar', service);

    service = await factory.build();
    assert.equal(1, spy.callCount);
    assert.equal('bar', service);
  });
});
