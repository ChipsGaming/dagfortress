const LazyLoader = require('../../../Storage/LazyLoader');

module.exports = class extends LazyLoader{
  async loadChrono(worldId){
    const chronoRepository = await this.container.get('ChronoRepository').build({}, this.container);

    return chronoRepository.findWith(
      chronoRepository.select()
        .inWorld(worldId)
    );
  }

  async loadDynamics(worldId){
    const dynamicRepository = await this.container.get('DynamicRepository').build({}, this.container);

    return dynamicRepository.fetchAll(
      dynamicRepository.select()
        .inWorld(worldId)
    );
  }

  async loadAliveDynamics(worldId){
    const dynamicRepository = await this.container.get('DynamicRepository').build({}, this.container);

    return dynamicRepository.fetchAll(
      dynamicRepository.select()
        .inWorld(worldId)
        .alive()
    );
  }

  async loadPlayers(worldId){
    const playerRepository = await this.container.get('PlayerRepository').build({}, this.container);

    return playerRepository.fetchAll(
      playerRepository.select()
        .inWorld(worldId)
    );
  }

  async loadPlayersCount(worldId){
    const playerRepository = await this.container.get('PlayerRepository').build({}, this.container);

    return playerRepository.getScalar(
      playerRepository.select()
        .inWorld(worldId)
        .count()
    );
  }

  async loadAlivePlayersCount(worldId){
    const playerRepository = await this.container.get('PlayerRepository').build({}, this.container);

    return playerRepository.getScalar(
      playerRepository.select()
        .inWorld(worldId)
        .alive()
        .count()
    );
  }

  async loadActivePlayersCount(worldId){
    const playerRepository = await this.container.get('PlayerRepository').build({}, this.container);

    return playerRepository.getScalar(
      playerRepository.select()
        .inWorld(worldId)
        .alive()
        .active()
        .count()
    );
  }

  async loadPlayerGroup(worldId){
    const allianceRepository = await this.container.get('AllianceRepository').build({}, this.container),
      groupRepository = await this.container.get('GroupRepository').build({}, this.container);

    return groupRepository.findWith(
      groupRepository.select()
        .inWorld(allianceRepository, worldId)
        .forPlayer()
    );
  }

  async loadActualTasks(worldId){
    const allianceRepository = await this.container.get('AllianceRepository').build({}, this.container),
      groupRepository = await this.container.get('GroupRepository').build({}, this.container),
      taskRepository = await this.container.get('TaskRepository').build({}, this.container);

    return taskRepository.fetchAll(
      taskRepository.select()
        .actual()
        .joinGroup(groupRepository)
        .inWorld(allianceRepository, worldId)
    );
  }
};
