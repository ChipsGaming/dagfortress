const LazyLoader = require('../../../Storage/LazyLoader');

module.exports = class extends LazyLoader{
  async loadAlliance(allianceId){
    const allianceRepository = await this.container.get('AllianceRepository').build({}, this.container);

    return allianceRepository.find('id', allianceId);
  }
};
