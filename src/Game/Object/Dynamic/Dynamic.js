const Object = require('../Object'),
  WaitEvent = require('./Event/WaitEvent'),
  MoveEvent = require('./Event/MoveEvent'),
  AttacksEvent = require('./Event/AttacksEvent');

module.exports = class extends Object{
  constructor(world, location, group, name){
    super(world, location, group, name);
    this.endurance = 3;
    this.currentEndurance = this.endurance;
    this.isDie = false;
    this.ai = 'default';

    this.lazyLoader = null;
  }

  // Getters
  /**
   * @return {Organ[]} Органы объекта.
   */
  async getOrgans(){
    return this.lazyLoader.loadOrgans(this.id);
  }

  /**
   * @return {Organ[]} Ноги объекта.
   */
  async getLegs(){
    return this.lazyLoader.loadLegs(this.id);
  }

  /**
   * @return {Dynamic[]} Органы объекта.
   */
  async getNearbyDynamics(){
    return await this.lazyLoader.loadNearbyDynamics(this);
  }

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
   * Пропуск хода.
   * 
   * @param {EventJournal} events Журнал событий.
   */
  wait(events){
    events.trigger(new WaitEvent(this));
  }

  /**
   * Переходит в соседнюю локацию.
   *
   * @param {EventJournal} events Журнал событий.
   * @param {Location} location Целевая локация.
   */
  move(events, location){
    events.trigger(new MoveEvent(this, location));
  }

  /**
   * Производит атаку.
   *
   * @param {EventJournal} events Журнал событий.
   * @param {Organ} weapon Используемое для атаки оружие.
   * @param {Dynamic} target Атакуемый объект.
   * @param {Organ} targetOrgan Атакуемый орган.
   */
  attack(events, weapon, target, targetOrgan){
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

    events.trigger(new AttacksEvent(
      this,
      weapon,
      target,
      targetOrgan,
      damage,
      damage === 0
    ));
  }
};
