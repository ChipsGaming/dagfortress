const PresetViewModel = require('../../../View/PresetViewModel'),
  PutEvent = require('../../../Game/Object/Dynamic/Event/PutEvent');

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
        .owner(this.player)
        .withName(match.name)
    );
    if(item === null){
      return new PresetViewModel('У вас нет этого предмета');
    }

    this.globalEvents.trigger(new PutEvent(
      this.player,
      item
    ));

    return new PresetViewModel('Ваш ход зарегистрирован');
  }
};
