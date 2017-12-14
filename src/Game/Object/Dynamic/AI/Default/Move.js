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

    const locations = await this.locationRepository.fetchAll(
      this.locationRepository.select()
        .inWorld(this.dynamic.world)
    );
    for(const location of locations){
      nodeIndex[location.id] = graph.createNode('location', {id: location.id, entity: location});

      const roads = await this.roadRepository.fetchAll(
        this.roadRepository.select()
          .exit(location)
      );
      for(const road of roads){
        graph.createEdge('road').link(
          nodeIndex[road.start],
          nodeIndex[road.end]
        );
      }
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
