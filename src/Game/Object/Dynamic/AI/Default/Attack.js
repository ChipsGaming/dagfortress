module.exports = class{
  constructor(
    dynamic,
    organRepository
  ){
    this.dynamic = dynamic;
    this.organRepository = organRepository;
  }

  /**
   * Выбирает используемое для атаки оружие.
   *
   * @param {Dynamic} target Целевой объект.
   *
   * @return {Organ} Используемое для атаки оружие.
   */
  async getWeapon(target){
    return await this.organRepository.findWith(
      this.organRepository.select()
        .part(this.dynamic)
        .weapon()
        .orderByMass('DESC')
    );
  }

  /**
   * Выбирает для атаки целевой орган.
   *
   * @param {Dynamic} target Целевой объект.
   *
   * @return {Organ} Целевой орган.
   */
  async getTargetOrgan(target){
    return await this.organRepository.findWith(
      this.organRepository.select()
        .part(target)
        .vital()
        .orderByMass('ASC')
    );
  }
};
