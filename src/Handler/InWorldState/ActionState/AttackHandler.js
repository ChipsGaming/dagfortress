const RegexRoute = require('../../../Router/RegexRoute');
const ViewModel = require('../../../View/ViewModel');

module.exports = class{
  constructor(
    player,
    container,
    dynamicRepository,
    organRepository
  ){
    this.player = player;
    this.container = container;
    this.dynamicRepository = dynamicRepository;
    this.organRepository = organRepository;
  }

  async attack(attacking, attacked, weapon = null, targetOrgan = null){
    if(weapon === null){
      weapon = await this.organRepository
        .select()
        .part(attacking)
        .weapon()
        .orderByMass('DESC')
        .build();
      if(weapon.length < 1){
        return;
      }
      weapon = this.organRepository.constructor.hydrate(weapon[0]);
    }

    if(targetOrgan === null){
      targetOrgan = await this.organRepository
        .select()
        .part(attacked)
        .vital()
        .orderByMass('ASC')
        .build();
      if(targetOrgan.length < 1){
        return;
      }
      targetOrgan = this.organRepository.constructor.hydrate(targetOrgan[0]);
    }

    attacking.attack(
      weapon,
      attacked,
      targetOrgan
    );
  }

  async process(message, match){
    match = new RegexRoute(/^ударить (.+) по (.+) у (.+)/i, ['weapon', 'organ', 'target'])
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

    await this.attack(
      this.player,
      target,
      weapon,
      targetOrgan
    );

    if(target.currentEndurance > 0){
      await this.attack(
        target,
        this.player
      );
    }

    const attacks = this.player.events.find('Attacks')
      .concat(target.events.find('Attacks'));

    for(const attack of attacks){
      const target = attack.data.target,
        targetOrgan = attack.data.targetOrgan;

      if(targetOrgan.dynamic === null){
        await this.organRepository.remove(targetOrgan);
      
        const legsCount = await this.organRepository.select()
          .part(target)
          .legs()
          .build()
          .count('id as count');
        if(parseInt(legsCount[0].count) < 1){
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
