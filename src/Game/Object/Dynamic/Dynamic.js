const Object = require('../Object');

module.exports = class extends Object{
  constructor(world, location, group, name){
    super(world, location, group, name);
    this.endurance = 3;
    this.currentEndurance = this.endurance;
    this.isDie = false;
    this.ai = 'default';
  }

  // Getters
  /**
   * @param {AIContainer} container Контейнер искусственного интеллекта.
   *
   * @return {AI} Искусственный интеллект объекта.
   */
  async getAI(container){
    return container.get(this.ai)
      .build({dynamic: this}, container);
  }

  // Actions
  /**
   * Переходит в соседнюю локацию.
   *
   * @param {Location} location Целевая локация.
   */
  move(location){
    this.location = location.id;
    this.currentEndurance--;

    this.events.trigger('EnterLocation', {
      dynamic: this,
      location: location
    });
  }

  /**
   * Производит атаку.
   *
   * @param {Organ} weapon Используемое для атаки оружие.
   * @param {Dynamic} target Атакуемый объект.
   * @param {Organ} targetOrgan Атакуемый орган.
   */
  attack(weapon, target, targetOrgan){
    const thisEnergy = this.currentEndurance / this.endurance,
      targetEnergy = target.currentEndurance / target.endurance,
      fatigue = thisEnergy * 1.5 / targetEnergy;

    let damage = weapon.mass;
    // Промах
    if(Math.random() * fatigue < 0.5){
      damage = 0;
    }
    const power = weapon.mass / targetOrgan.mass * thisEnergy;
    damage = Math.floor(damage * power);

    targetOrgan.damage += damage;
    if(targetOrgan.damage >= 10){
      targetOrgan.dynamic = null;

      if(targetOrgan.isVital){
        target.isDie = true;
      }
    }

    this.currentEndurance--;

    this.events.trigger('Attacks', {
      attacking: this,
      weapon: weapon,
      target: target,
      targetOrgan: targetOrgan,
      damage: damage,
      isMiss: damage === 0
    });
    target.events.trigger('Attacked', {
      attaking: this,
      weapon: weapon,
      target: target,
      targetOrgan: targetOrgan,
      damage: damage,
      isMiss: damage === 0
    });
  }
};
