const RegexRoute = require('../../../Router/RegexRoute'),
  PresetViewModel = require('../../../View/PresetViewModel');

module.exports = class{
  constructor(
    player,
    globalEvents,
    aiContainer,
    dynamicRepository,
    playerRepository,
    organRepository
  ){
    this.player = player;
    this.globalEvents = globalEvents;
    this.aiContainer = aiContainer;
    this.dynamicRepository = dynamicRepository;
    this.playerRepository = playerRepository;
    this.organRepository = organRepository;
  }

  async process(message, match){
    match = new RegexRoute(/^у(?:дарить)? (.+) по (.+) у (.+)/i, ['weapon', 'organ', 'target'])
      .route(message);

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

    const targetOrgan = await this.organRepository.find({
      dynamic: target.id,
      name: match.organ
    });
    if(targetOrgan === null){
      return new PresetViewModel(`У ${target.name} нет ${match.organ} для нанесения удара`);
    }

    this.player.attack(
      this.globalEvents,
      weapon,
      target,
      targetOrgan
    );

    const targetIsPlayer = await this.playerRepository.find('player.id', target.id) !== null;
    if(target.currentEndurance > 0 && !targetIsPlayer){
      const ai = await target.getAI(this.aiContainer),
        weapon = await ai.attack.getWeapon(this.player),
        targetOrgan = await ai.attack.getTargetOrgan(this.player);

      if(weapon !== null && targetOrgan !== null){
        target.attack(
          this.globalEvents,
          weapon,
          this.player,
          targetOrgan
        );
      }
    }

    return new PresetViewModel('Ваш ход зарегистрирован');
  }
};
