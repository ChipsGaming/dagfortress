const Uuid = require('uuid/v4');

module.exports = class{
  constructor(dynamic, name){
    this.id = Uuid();
    this.dynamic = dynamic;
    this.name = name;
    this.damage = 0;
    this.isVital = false; // Жизненно важный
    this.isWeapon = false; // Может использоваться в качестве оружия
    this.isLegs = false; // Отвечает за передвижение
    this.isKeeping = false; // Может держать (хранить) предметы
    this.added = null;
  }

  setWeapon(isWeapon){
    this.isWeapon = isWeapon;

    return this;
  }

  setVital(isVital){
    this.isVital = isVital;

    return this;
  }

  setLegs(isLegs){
    this.isLegs = isLegs;

    return this;
  }

  setKeeping(isKeeping){
    this.isKeeping = isKeeping;

    return this;
  }
};
