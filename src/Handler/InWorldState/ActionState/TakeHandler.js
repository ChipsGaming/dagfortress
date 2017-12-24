const PresetViewModel = require('../../../View/PresetViewModel'),
  TakeEvent = require('../../../Game/Object/Dynamic/Event/TakeEvent');

module.exports = class{
  constructor(
    player,
    globalEvents,
    itemRepository
  ){
    this.player = player;
    this.globalEvents = globalEvents;
    this.itemRepository = itemRepository;
  }

  async process(message, match){
    const item = await this.itemRepository.findWith(
      this.itemRepository.select()
        .inLocation(this.player.location)
        .withoutOwner()
        .withName(match.name)
    );
    if(item === null){
      return new PresetViewModel('Рядом с вами нет этого предмета');
    }

    this.globalEvents.trigger(new TakeEvent(
      this.player,
      item
    ));

    return new PresetViewModel('Ваш ход зарегистрирован');
  }
};
