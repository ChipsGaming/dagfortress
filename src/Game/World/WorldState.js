module.exports = class{
  constructor(){
    this.updatedDynamics = new Map;
    this.updatedOrgans = new Map;

    this.removableOrgans = [];
  }

  getDynamic(id, def){
    if(!this.updatedDynamics.has(id)){
      this.updatedDynamics.set(
        id,
        Object.assign({}, def)
      );
    }

    return this.updatedDynamics.get(id);
  }

  getOrgan(id, def){
    if(!this.updatedOrgans.has(id)){
      this.updatedOrgans.set(
        id,
        Object.assign({}, def)
      );
    }

    return this.updatedOrgans.get(id);
  }

  deleteOrgan(organ){
    this.updatedOrgans.delete(organ.id);
    this.removableOrgans.push(organ);
  }

  /**
   * Применяет зарегистрированные события для формирования нового состояния.
   */
  applyEvents(eventJournal){
    for(const event of eventJournal.events){
      event.apply(this);
    }

    for(const attacks of eventJournal.findByName('Attacks')){
      const target = this.getDynamic(attacks.data.target.id, attacks.data.target),
        targetOrgan = this.getOrgan(attacks.data.targetOrgan.id, attacks.data.targetOrgan);

      if(targetOrgan.damage >= 10){
        this.deleteOrgan(targetOrgan);

        if(targetOrgan.isVital){
          target.isDie = true;
        }
      }
    }
  }

  /**
   * Заменяет текущее состояние мира заданным.
   *
   * @param {DynamicRepository} dynamicRepository
   * @param {OrganRepository} organRepository
   */
  async replaceCurrentState(
    dynamicRepository,
    organRepository
  ){
    for(const [key, dynamic] of this.updatedDynamics){
      await dynamicRepository.save(dynamic);
    }
    for(const [key, organ] of this.updatedOrgans){
      await organRepository.save(organ);
    }
    for(const organ of this.removableOrgans){
      await organRepository.remove(organ);
    }
  }
};
