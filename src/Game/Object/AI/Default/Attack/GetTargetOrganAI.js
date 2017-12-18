module.exports = class{
  static async factory(options, container){
    return new this(
      await container.get('OrganRepository').build({}, container)
    );
  }

  constructor(
    organRepository
  ){
    this.organRepository = organRepository;
  }

  async process(dynamic, target){
    return await this.organRepository.findWith(
      this.organRepository.select()
        .part(target)
        .vital()
        .orderByMass('ASC')
    );
  }
};
