const LazyLoader = require('../../../../Storage/LazyLoader');

module.exports = class extends LazyLoader{
  async loadWorld(worldId){
    const worldRepository = await this.container.get('WorldRepository').build({}, this.container);

    return worldRepository.find('id', worldId);
  }

  async loadNearbyLocations(locationId){
    const locationRepository = await this.container.get('LocationRepository').build({}, this.container),
      roadRepository = await this.container.get('RoadRepository').build({}, this.container);

    return locationRepository.fetchAll(
      locationRepository.select()
        .nearby(roadRepository, locationId)
    );
  }

  async loadDynamics(locationId){
    const dynamicRepository = await this.container.get('DynamicRepository').build({}, this.container);

    return dynamicRepository.fetchAll(
      dynamicRepository.select()
        .inLocation(locationId)
    );
  }

  async loadAliveDynamics(locationId){
    const dynamicRepository = await this.container.get('DynamicRepository').build({}, this.container);

    return dynamicRepository.fetchAll(
      dynamicRepository.select()
        .inLocation(locationId)
        .alive()
    );
  }
};
