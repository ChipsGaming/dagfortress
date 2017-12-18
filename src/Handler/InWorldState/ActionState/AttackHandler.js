const RegexRoute = require('../../../Router/RegexRoute'),
  PresetViewModel = require('../../../View/PresetViewModel'),
  AttacksEvent = require('../../../Game/Object/Dynamic/Event/AttacksEvent');

module.exports = class{
  constructor(
    player,
    globalEvents,
    dynamicRepository,
    playerRepository,
    organRepository
  ){
    this.player = player;
    this.globalEvents = globalEvents;
    this.dynamicRepository = dynamicRepository;
    this.playerRepository = playerRepository;
    this.organRepository = organRepository;
  }

  async process(message, match){
    match = new RegexRoute(/^у(?:дарить)? (.+) по (.+) у (.+)/i, ['weapon', 'organ', 'target'])
      .route(message);

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

    const weapon = await this.organRepository.find({
      dynamic: this.player.id,
      name: match.weapon
    });
    if(weapon === null){
      return new PresetViewModel('У вас нет такого оружия');
    }
    if(!weapon.isWeapon){
      return new PresetViewModel(`${weapon.name} не является оружием`);
    }

    const targetOrgan = await this.organRepository.find({
      dynamic: target.id,
      name: match.organ
    });
    if(targetOrgan === null){
      return new PresetViewModel(`У ${target.name} нет ${match.organ} для нанесения удара`);
    }

    const ai = await (await this.player.getGroup()).getAI(),
      damage = await ai.getDamage(this.player, weapon, target, targetOrgan);

    this.globalEvents.trigger(new AttacksEvent(
      this.player,
      weapon,
      target,
      targetOrgan,
      damage,
      damage === 0
    ));

    return new PresetViewModel('Ваш ход зарегистрирован');
  }
};
