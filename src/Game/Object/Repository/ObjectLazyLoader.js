const LazyLoader = require('../../../Storage/LazyLoader');

module.exports = class extends LazyLoader{
  async loadWorld(worldId){
    const worldRepository = await this.container.get('WorldRepository').build({}, this.container);

    return worldRepository.find('id', worldId);
  }

  async loadLocation(locationId){
    const locationRepository = await this.container.get('LocationRepository').build({}, this.container);

    return locationRepository.find('id', locationId);
  }
};
