const PresetViewModel = require('../../../View/PresetViewModel');

module.exports = class{
  constructor(
    player,
    globalEvents,
    locationRepository,
    roadRepository,
    dynamicRepository,
    playerRepository
  ){
    this.player = player;
    this.globalEvents = globalEvents;
    this.locationRepository = locationRepository;
    this.roadRepository = roadRepository;
    this.dynamicRepository = dynamicRepository;
    this.playerRepository = playerRepository;
  }

  async process(message, match){
    const location = await this.locationRepository.findWith(
      this.locationRepository.select()
        .withName(match.name)
        .nearby(this.roadRepository, this.player.location)
    );
    if(location === null){
      return 'Вы не видите этой локации';
    }

    this.player.move(location);
    this.globalEvents.merge(this.player.events);

    return new PresetViewModel('Ваш ход зарегистрирован');
  }
};
