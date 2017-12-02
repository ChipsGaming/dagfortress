const Uuid = require('uuid/v4');

module.exports = class{
  constructor(world, name, description){
    this.id = Uuid();
    this.world = world;
    this.name = name;
    this.description = description;
    this.isStart = false;
    this.added = null;
  }

  // Getters
  setStart(isStart){
    this.isStart = isStart;

    return this;
  }

  /**
   * @param {LocationRepository} locationRepository
   * @param {RoadRepository} roadRepository
   *
   * @return {Location[]} Соседние локации.
   */
  async getNearbyLocations(locationRepository, roadRepository){
    return locationRepository.fetchAll(
      locationRepository.select()
        .nearby(roadRepository, this.id)
    );
  }
};
