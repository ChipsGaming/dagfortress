const Uuid = require('uuid/v4');

module.exports = class{
  constructor(dynamic, name){
    this.id = Uuid();
    this.dynamic = dynamic;
    this.name = name;
    this.damage = 0; // Уровень повреждения (0 - нет повреждений; 10 - недееспособно)
    this.isVital = false; // Жизненно важный
    this.isWeapon = false; // Может использоваться в качестве оружия
    this.isLegs = false; // Отвечает за передвижение
    this.isKeeping = false; // Может держать (хранить) предметы
    this.mass = 3; // Масса
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

  setMass(mass){
    this.mass = mass;

    return this;
  }
};
