const UG = require('ug');

module.exports = class{
  constructor(
    aiContainer,
    allianceRepository,
    groupRepository,
    locationRepository,
    roadRepository,
    dynamicRepository
  ){
    this.aiContainer = aiContainer;
    this.allianceRepository = allianceRepository;
    this.groupRepository = groupRepository;
    this.locationRepository = locationRepository;
    this.roadRepository = roadRepository;
    this.dynamicRepository = dynamicRepository;
  }

  async check(task){
    const group = await this.groupRepository.find('id', task.group),
      location = await this.locationRepository.find('name', task.target);
    if(group === null){
      return true;
    }

    const alliesOutLocationCount = await this.dynamicRepository.getScalar(
      this.dynamicRepository.select()
        .inGroup(task.group)
        .alive()
        .outLocation(location.id)
        .count()
    );

    const enemiesInLocationCount = await this.dynamicRepository.getScalar(
      this.dynamicRepository.select()
        .enemies(
          group.alliance,
          this.groupRepository,
          this.allianceRepository
        )
        .alive()
        .inLocation(task.target)
        .count()
    );

    return alliesOutLocationCount == 0 && enemiesInLocationCount == 0;
  }

  async run(dynamic, task){
    const group = await this.groupRepository.find('id', dynamic.group);
    if(group === null){
      dynamic.currentEndurance = 0;
      return;
    }

    const enemy = await this.dynamicRepository.findWith(
      this.dynamicRepository.select()
        .inLocation(dynamic.location)
        .alive()
        .enemies(
          await this.groupRepository.find('id', group.alliance),
          this.groupRepository,
          this.allianceRepository
        )
    );

    // Атака в текущей локации
    if(enemy !== null){
      const ai = await dynamic.getAI(this.aiContainer),
        weapon = await ai.attack.getWeapon(enemy),
        targetOrgan = await ai.attack.getTargetOrgan(enemy);

      if(weapon === null || targetOrgan === null){
        dynamic.currentEndurance = 0;
        return;
      }

      dynamic.attack(
        weapon,
        enemy,
        targetOrgan
      );
    }
    // Перемещение к целевой локации
    else{
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
        nodeIndex[targetLocation.id]
      );
      if(path.length() == 0){
        dynamic.currentEndurance = 0;
        return;
      }

      dynamic.move(
        await this.locationRepository.find('id', path._raw[2].properties.id)
      );
    }
  }
};
