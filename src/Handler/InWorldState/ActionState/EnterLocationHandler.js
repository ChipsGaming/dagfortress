const PresetViewModel = require('../../../View/PresetViewModel');

module.exports = class{
  constructor(
    player,
    globalEvents,
    locationRepository,
    roadRepository
  ){
    this.player = player;
    this.globalEvents = globalEvents;
    this.locationRepository = locationRepository;
    this.roadRepository = roadRepository;
  }

  async process(message, match){
    const location = await this.locationRepository.findWith(
      this.locationRepository.select()
        .withName(match.name)
        .nearby(this.roadRepository, this.player.location)
    );
    if(location === null){
      return new PresetViewModel('Вы не видите этой локации');
    }

    this.player.move(this.globalEvents, location);

    return new PresetViewModel('Ваш ход зарегистрирован');
  }
};
