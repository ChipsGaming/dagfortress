const UG = require('ug');

module.exports = class{
  constructor(
    locationRepository,
    roadRepository,
    dynamicRepository
  ){
    this.locationRepository = locationRepository;
    this.roadRepository = roadRepository;
    this.dynamicRepository = dynamicRepository;
  }

  async run(dynamic, action, task, next){
    const targetLocation = await this.locationRepository.find('name', action.target.location);
    if(targetLocation === null || dynamic.location == targetLocation.id){
      return next(dynamic, action, task);
    }

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
      nodeIndex[dynamic.location],
      nodeIndex[targetLocation.id]
    );
    if(path.length() == 0){
      return next(dynamic, action, task);
    }

    dynamic.move(path._raw[2].properties.entity);
  }
};
