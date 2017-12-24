const ObjectLazyLoader = require('../../Repository/ObjectLazyLoader');

module.exports = class extends ObjectLazyLoader{
  async loadOwner(ownerId){
    const dynamicRepository = await this.container.get('DynamicRepository').build({}, this.container);

    return dynamicRepository.find('object.id', ownerId);
  }
};
