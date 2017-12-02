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
  }

  // Getters
  /**
   * @param {OrganRepository} organRepository
   *
   * @return {Organ[]} Органы объекта.
   */
  async getOrgans(organRepository){
    return organRepository.fetchAll(
      organRepository.select()
        .part(this)
    );
  }

  /**
   * @param {OrganRepository} organRepository
   *
   * @return {Organ[]} Ноги объекта.
   */
  async getLegs(organRepository){
    return organRepository.fetchAll(
      organRepository.select()
        .part(this)
        .legs()
    );
  }

  /**
   * @param {DynamicRepository} dynamicRepository
   *
   * @return {Dynamic[]} Органы объекта.
   */
  async getNearbyDynamics(dynamicRepository){
    return dynamicRepository.fetchAll(
      dynamicRepository.select()
        .nearby(this)
    );
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
   */
  wait(){
    this.events.trigger(new WaitEvent(this));
  }

  /**
   * Переходит в соседнюю локацию.
   *
   * @param {Location} location Целевая локация.
   */
  move(location){
    this.events.trigger(new MoveEvent(this, location));
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

    this.events.trigger(new AttacksEvent(
      this,
      weapon,
      target,
      targetOrgan,
      damage,
      damage === 0
    ));
  }
};
