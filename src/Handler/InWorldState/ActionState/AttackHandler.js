const RegexRoute = require('../../../Router/RegexRoute');
const ViewModel = require('../../../View/ViewModel');

module.exports = class{
  constructor(
    player,
    aiContainer,
    dynamicRepository,
    playerRepository,
    organRepository
  ){
    this.player = player;
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
      return 'У вас нет такого оружия';
    }
    if(!weapon.isWeapon){
      return `${weapon.name} не является оружием`;
    }

    const target = await this.dynamicRepository.find({
      'object.name': match.target,
      'object.location': this.player.location
    });
    if(target === null){
      return `Рядом с вами нет ${match.target}`;
    }
    if(target.id == this.player.id){
      return 'Мазахист? А ну пшел атседава!';
    }

    const targetOrgan = await this.organRepository.find({
      dynamic: target.id,
      name: match.organ
    });
    if(targetOrgan === null){
      return `У ${target.name} нет ${match.organ} для нанесения удара`;
    }

    this.player.attack(
      weapon,
      target,
      targetOrgan
    );

    const targetIsPlayer = await this.playerRepository.find('player.id', target.id) !== null;
    if(target.currentEndurance > 0 && !targetIsPlayer){
      const ai = await target.getAI(this.aiContainer),
        weapon = await ai.attack.getWeapon(target),
        targetOrgan = await ai.attack.getTargetOrgan(target);

      if(weapon !== null && targetOrgan !== null){
        target.attack(
          weapon,
          this.player,
          targetOrgan
        );
      }
    }

    const attacks = this.player.events.find('Attacks')
      .concat(target.events.find('Attacks'));

    for(const attack of attacks){
      const target = attack.data.target,
        targetOrgan = attack.data.targetOrgan;

      if(targetOrgan.dynamic === null){
        await this.organRepository.remove(targetOrgan);
      
        const legsCount = await this.organRepository.getScalar(
          this.organRepository.select()
            .part(target)
            .legs()
            .count()
        );
        if(legsCount < 1){
          target.endurance = 0;
        }
      }
      else{
        await this.organRepository.save(targetOrgan);
      }

      await this.dynamicRepository.save(target);
    }

    return new ViewModel('in_world_state/action_state/attack', {
      attacks: attacks
    });
  }
};
