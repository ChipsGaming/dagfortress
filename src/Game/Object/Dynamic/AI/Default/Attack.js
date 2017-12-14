module.exports = class{
  static async factory(options, container){
    return new this(
      options.dynamic,
      await container.get('DynamicRepository').build({}, container),
      await container.get('OrganRepository').build({}, container),
      await container.get('AllianceRepository').build({}, container),
      await container.get('GroupRepository').build({}, container)
    );
  }

  constructor(
    dynamic,
    dynamicRepository,
    organRepository,
    allianceRepository,
    groupRepository
  ){
    this.dynamic = dynamic;
    this.dynamicRepository = dynamicRepository;
    this.organRepository = organRepository;
    this.allianceRepository = allianceRepository;
    this.groupRepository = groupRepository;
  }

  async getTarget(){
    const group = await this.dynamic.getGroup();
    if(group === null){
      return null;
    }

    return await this.dynamicRepository.findWith(
      this.dynamicRepository.select()
        .inLocation(this.dynamic.location)
        .alive()
        .enemies(
          group.alliance,
          this.groupRepository,
          this.allianceRepository
        )
    );
  }

  async getWeapon(target){
    return await this.organRepository.findWith(
      this.organRepository.select()
        .part(this.dynamic)
        .weapon()
        .orderByMass('DESC')
    );
  }

  async getTargetOrgan(target){
    return await this.organRepository.findWith(
      this.organRepository.select()
        .part(target)
        .vital()
        .orderByMass('ASC')
    );
  }

  async getDamage(weapon, target, targetOrgan){
    const thisEnergy = this.dynamic.currentEndurance / this.dynamic.endurance,
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
