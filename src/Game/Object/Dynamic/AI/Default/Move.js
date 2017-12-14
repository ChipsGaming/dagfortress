const UG = require('ug');

module.exports = class{
  static async factory(options, container){
    return new this(
      options.dynamic,
      await container.get('LocationRepository').build({}, container),
      await container.get('RoadRepository').build({}, container)
    );
  }

  constructor(
    dynamic,
    locationRepository,
    roadRepository
  ){
    this.dynamic = dynamic;
    this.locationRepository = locationRepository;
    this.roadRepository = roadRepository;
  }

  async getNextLocation(targetLocation){
    const graph = new UG.Graph(),
      nodeIndex = {};
    for(const location of await this.locationRepository.fetchAll()){
      nodeIndex[location.id] = graph.createNode('location', {id: location.id, entity: location});
    }
    for(const road of await this.roadRepository.fetchAll()){
      graph.createEdge('road').link(
        nodeIndex[road.start],
        nodeIndex[road.end]
      );
    }

    const path = graph.trace(
      nodeIndex[this.dynamic.location],
      nodeIndex[targetLocation.id]
    );
    if(path.length() == 0){
      return null;
    }

    return path._raw[2].properties.entity;
  }
}
