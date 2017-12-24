const RegexRoute = require('../../../Router/RegexRoute'),
  PresetViewModel = require('../../../View/PresetViewModel'),
  AttacksEvent = require('../../../Game/Object/Dynamic/Event/AttacksEvent');

module.exports = class{
  constructor(
    player,
    globalEvents,
    dynamicRepository,
    playerRepository
  ){
    this.player = player;
    this.globalEvents = globalEvents;
    this.dynamicRepository = dynamicRepository;
    this.playerRepository = playerRepository;
  }

  async process(message, match){
    const target = await this.dynamicRepository.find({
      'object.name': match.target,
      'object.location': this.player.location
    });
    if(target === null){
      return new PresetViewModel(`Рядом с вами нет ${match.target}`);
    }
    if(target.id == this.player.id){
      return new PresetViewModel('Мазахист? А ну пшел атседава!');
    }
    if((await this.player.getGroup()).alliance == (await target.getGroup()).alliance){
      return new PresetViewModel(`${target.name} ваш союзник`);
    }

    const ai = await (await this.player.getGroup()).getAI(),
      damage = await ai.getDamage(this.player, target);

    this.globalEvents.trigger(new AttacksEvent(
      this.player,
      target,
      damage,
      damage === 0
    ));

    return new PresetViewModel('Ваш ход зарегистрирован');
  }
};
