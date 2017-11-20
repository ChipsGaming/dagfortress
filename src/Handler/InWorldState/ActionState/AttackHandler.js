const RegexRoute = require('../../../Router/RegexRoute');
const ViewModel = require('../../../View/ViewModel');

module.exports = class{
  constructor(
    player,
    playerRepository,
    organRepository
  ){
    this.player = player;
    this.playerRepository = playerRepository;
    this.organRepository = organRepository;
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

    const target = await this.playerRepository.find({
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

    const damage = this.player.attack(
      weapon,
      target,
      targetOrgan
    );

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
    await this.playerRepository.save(target);

    return new ViewModel('in_world_state/action_state/attack', {
      player: this.player,
      weapon: weapon,
      target: target,
      targetOrgan: targetOrgan,
      isMiss: damage == 0
    });
  }
};
