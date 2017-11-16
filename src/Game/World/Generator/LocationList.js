const Road = require('../Location/Road');

module.exports = class{
  constructor(startLocation){
    this.startLocation = startLocation;
    this.locations = [];
    this.roads = [];
    this.lastLocation = null;

    this.addLocation(this.startLocation);
  }

  // Getters
  hasLocation(location){
    return this.locations.indexOf(location) !== -1;
  }

  locationsForEach(callback){
    this.locations.forEach(callback);
  }

  hasRoad(road){
    return this.roads.indexOf(road) !== -1;
  }

  roadsForEach(callback){
    this.roads.forEach(callback);
  }

  // Actions
  addLocation(location){
    if(this.hasLocation(location)){
      return;
    }

    this.locations.push(location);
    this.lastLocation = location;
  }

  addRoad(road){
    if(this.hasRoad(road)){
      return;
    }

    this.roads.push(road);
  }

  createRoad(locationStart, locationEnd){
    this.addLocation(locationStart);
    this.addLocation(locationEnd);

    this.addRoad(
      new Road(locationStart.id, locationEnd.id)
    );

    return this;
  }
};
