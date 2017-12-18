module.exports = class{
  static async factory(options, container){
    return new this;
  }

  async process(dynamic, weapon, target, targetOrgan){
    const thisEnergy = dynamic.currentEndurance / dynamic.endurance,
      targetEnergy = target.currentEndurance / target.endurance,
      fatigue = thisEnergy * 1.5 / targetEnergy;

    let damage = weapon.mass;
    // Промах
    if(Math.random() * fatigue < 0.5){
      damage = 0;
    }
    const power = weapon.mass / targetOrgan.mass * thisEnergy;

    return Math.floor(damage * power);
  }
};
