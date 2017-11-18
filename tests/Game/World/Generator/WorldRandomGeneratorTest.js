var assert = require('assert'),
  WorldRandomGenerator = require('../../../../src/Game/World/Generator/WorldRandomGenerator');

describe('generate', () => {
  it('Generate random world', () => {
    const generator = new WorldRandomGenerator({
      names: ['a'],
      locationDescription: ['foo'],
      usingDescription: ['foz']
    });

    const world = generator.generate(123);

    assert.equal(generator.data.names[0], world.name);
    assert.equal(
      [generator.data.locationDescription[0], generator.data.usingDescription[0]].join('. '),
      world.description
    );
  });
});
