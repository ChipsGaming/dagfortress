var assert = require('assert'),
  sinon = require('sinon'),
  LocationList = require('../../../../src/Game/World/Generator/LocationList'),
  Location = require('../../../../src/Game/World/Location/Location'),
  Road = require('../../../../src/Game/World/Location/Road');

describe('constructor', () => {
  it('Should set start location', () => {
    const location = new Location('123').setStart(true),
      list = new LocationList(location);

    assert.equal(location, list.startLocation);
    assert.equal(location, list.lastLocation);
  });
});

describe('hasLocation', () => {
  it('Should expect location in list', () => {
    const location = new Location('123').setStart(true),
      list = new LocationList(location);

    assert.ok(list.hasLocation(location));
    assert.equal(false, list.hasLocation(new Location('321')));
  });
});

describe('locationsForEach', () => {
  it('Should for each locations', () => {
    const location = new Location('123').setStart(true),
      spy = sinon.spy(),
      list = new LocationList(location);
    list.addLocation(new Location('321'));
    
    list.locationsForEach(spy);

    assert.equal(2, spy.callCount);
  });
});

describe('hasRoad', () => {
  it('Should expect road in list', () => {
    const location = new Location('123').setStart(true),
      road = new Road(location.id, location.id),
      list = new LocationList(location);
    list.addRoad(road);

    assert.ok(list.hasRoad(road));
    assert.equal(false, list.hasRoad(new Road('1', '2')));
  });
});

describe('roadsForEach', () => {
  it('Should for each roads', () => {
    const location = new Location('123').setStart(true),
      spy = sinon.spy(),
      list = new LocationList(location);
    list.addRoad(new Road(location.id, location.id));
    list.addRoad(new Road(location.id, location.id));
    
    list.roadsForEach(spy);

    assert.equal(2, spy.callCount);
  });
});

describe('addLocation', () => {
  it('Should add location to list', () => {
    const location = new Location('123').setStart(true),
      list = new LocationList(location);

    assert.equal(1, list.locations.length);

    list.addLocation(new Location('321'));

    assert.equal(2, list.locations.length);
  });

  it('Should control duplicates', () => {
    const location = new Location('123').setStart(true),
      list = new LocationList(location);

    assert.equal(1, list.locations.length);

    list.addLocation(location);

    assert.equal(1, list.locations.length);
  });
});

describe('addRoad', () => {
  it('Should add road to list', () => {
    const location = new Location('123').setStart(true),
      list = new LocationList(location);
    list.addRoad(new Road(location.id, location.id));

    assert.equal(1, list.roads.length);

    list.addRoad(new Road(location.id, location.id));

    assert.equal(2, list.roads.length);
  });

  it('Should control duplicates', () => {
    const location = new Location('123').setStart(true),
      road = new Road(location.id, location.id),
      list = new LocationList(location);
    list.addRoad(road);
  
    assert.equal(1, list.roads.length);
  
    list.addRoad(road);
  
    assert.equal(1, list.roads.length);
  });
});

describe('createRoad', () => {
  it('Should create road and locations', () => {
    const location = new Location('123').setStart(true),
      list = new LocationList(location);

    list
      .createRoad(
        list.lastLocation,
        new Location('1')
      )
      .createRoad(
        list.lastLocation,
        new Location('1')
      );

    assert.equal(3, list.locations.length);
    assert.equal(2, list.roads.length);
  });
});
