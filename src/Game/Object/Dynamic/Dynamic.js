const Object = require('../Object');

module.exports = class extends Object{
  constructor(world, location, name){
    super(world, location, name);
    this.endurance = 3;
    this.currentEndurance = this.endurance;
    this.isDie = false;
  }

  // Actions
  /**
   * Производит атаку.
   *
   * @param {Organ} weapon Используемое для атаки оружие.
   * @param {Dynamic} target Атакуемый объект.
   * @param {Organ} targetOrgan Атакуемый орган.
   *
   * @return {Integer} Нанесенный урон (0 - промах, 6 - максимальный урон).
   */
  attack(weapon, target, targetOrgan){
    const thisEnergy = this.currentEndurance / this.endurance,
      targetEnergy = target.currentEndurance / target.endurance;

    let damage = weapon.mass;
    // Попадение
    if((Math.random() * 10) * thisEnergy * 2 > 5){
      let power = (1 - (targetOrgan.mass - 1) / weapon.mass);
      if(targetEnergy < 1){
        power = power * (1 + targetEnergy);
      }

      damage = damage * power;
    }
    // Промах
    else{
      damage = 0;
    }
    damage = Math.floor(damage);

    targetOrgan.damage += damage;
    if(targetOrgan.damage >= 10){
      targetOrgan.dynamic = null;

      if(targetOrgan.isVital){
        target.isDie = true;
      }
    }

    this.events.trigger('Attacks', {
      weapon: weapon,
      target: target,
      targetOrgan: targetOrgan,
      damage: damage
    });
    target.events.trigger('Attacked', {
      attaking: this,
      weapon: weapon,
      targetOrgan: targetOrgan,
      damage: damage
    });

    return damage;
  }
};
