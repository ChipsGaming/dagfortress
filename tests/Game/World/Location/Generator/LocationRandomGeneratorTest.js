var assert = require('assert'),
  LocationRandomGenerator = require('../../../../../src/Game/World/Location/Generator/LocationRandomGenerator');

describe('generate', () => {
  it('Generate random locatoin', () => {
    const generator = new LocationRandomGenerator({
      names: ['a'],
      locationDescription: ['foo']
    });

    const location = generator.generate({});

    assert.equal(generator.data.names[0], location.name);
    assert.equal(generator.data.locationDescription[0], location.description);
  });
});
