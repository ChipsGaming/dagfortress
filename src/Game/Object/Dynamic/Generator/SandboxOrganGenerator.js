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
        .setVital(true),
      new Organ(this.dynamic, 'Тело')
        .setVital(true),
      new Organ(this.dynamic, 'Левая рука')
        .setWeapon(true)
        .setKeeping(true),
      new Organ(this.dynamic, 'Правая рука')
        .setWeapon(true)
        .setKeeping(true),
      new Organ(this.dynamic, 'Левая нога')
        .setLegs(true)
        .setWeapon(true),
      new Organ(this.dynamic, 'Правая нога')
        .setLegs(true)
        .setWeapon(true),
    ];
  }
};
