const Organ = require('../Organ');

module.exports = class{
  constructor(dynamic){
    this.dynamic = dynamic;
  }

  /**
   * Генерирует части объекта.
   *
   * @return {Organ[]}
   */
  async generate(){
    return [
      new Organ(this.dynamic, 'Голова')
        .setMass(2)
        .setVital(true),
      new Organ(this.dynamic, 'Тело')
        .setVital(true),
      new Organ(this.dynamic, 'Левая рука')
        .setMass(2)
        .setWeapon(true)
        .setKeeping(true),
      new Organ(this.dynamic, 'Правая рука')
        .setMass(2)
        .setWeapon(true)
        .setKeeping(true),
      new Organ(this.dynamic, 'Левая нога')
        .setMass(2)
        .setLegs(true)
        .setWeapon(true),
      new Organ(this.dynamic, 'Правая нога')
        .setMass(2)
        .setLegs(true)
        .setWeapon(true),
    ];
  }
};
