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

  async check(task){
    const alliesOutLocationCount = await this.dynamicRepository.getScalar(
      this.dynamicRepository.select()
        .inGroup(task.group)
        .alive()
        .outLocation(task.target)
        .count()
    );

    return alliesOutLocationCount == 0;
  }

  async run(dynamic, task){
    const targetLocation = await this.locationRepository.find('name', task.target);
    if(targetLocation === null){
      dynamic.currentEndurance = 0;
      return;
    }
    if(dynamic.location == targetLocation.id){
      dynamic.currentEndurance = 0;
      return;
    }

    const graph = new UG.Graph(),
      nodeIndex = {};
    for(const location of await this.locationRepository.fetchAll()){
      nodeIndex[location.id] = graph.createNode('location', {id: location.id});
    }
    for(const road of await this.roadRepository.fetchAll()){
      graph.createEdge('road').link(
        nodeIndex[road.start],
        nodeIndex[road.end]
      );
    }

    const path = graph.trace(
      nodeIndex[dynamic.location],
      nodeIndex[task.target]
    );
    if(path.length() == 0){
      dynamic.currentEndurance = 0;
      return;
    }

    dynamic.move(path._raw[2].properties.id);
  }
};
