const ObjectLazyLoader = require('../../Repository/ObjectLazyLoader');

module.exports = class extends ObjectLazyLoader{
  async loadOrgans(dynamicId){
    const organRepository = await this.container.get('OrganRepository').build({}, this.container);

    return organRepository.fetchAll(
      organRepository.select()
        .part(dynamicId)
    );
  }

  async loadLegs(dynamicId){
    const organRepository = await this.container.get('OrganRepository').build({}, this.container);

    return organRepository.fetchAll(
      organRepository.select()
        .part(dynamicId)
        .legs()
    );
  }

  async loadNearbyDynamics(dynamic){
    const dynamicRepository = await this.container.get('DynamicRepository').build({}, this.container);

    return dynamicRepository.fetchAll(
      dynamicRepository.select()
        .nearby(dynamic)
    );
  }
};
