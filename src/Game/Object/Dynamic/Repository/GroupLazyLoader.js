const LazyLoader = require('../../../../Storage/LazyLoader');

module.exports = class extends LazyLoader{
  async loadAlliance(allianceId){
    const allianceRepository = await this.container.get('AllianceRepository').build({}, this.container);

    return allianceRepository.find('id', allianceId);
  }

  async loadStartLocation(locationId){
    const locationRepository = await this.container.get('LocationRepository').build({}, this.container);

    return locationRepository.find('id', locationId);
  }

  async loadPlayersCount(groupId){
    const playerRepository = await this.container.get('PlayerRepository').build({}, this.container);

    return playerRepository.getScalar(
      playerRepository.select()
        .inGroup(groupId)
        .count()
    );
  }

  async loadAI(ai){
    return this.container.get('AI').build({ai: ai}, this.container);
  }
};
