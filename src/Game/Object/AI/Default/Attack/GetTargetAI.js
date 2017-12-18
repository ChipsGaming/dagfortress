module.exports = class{
  static async factory(options, container){
    return new this(
      await container.get('DynamicRepository').build({}, container),
      await container.get('AllianceRepository').build({}, container),
      await container.get('GroupRepository').build({}, container)
    );
  }

  constructor(
    dynamicRepository,
    allianceRepository,
    groupRepository
  ){
    this.dynamicRepository = dynamicRepository;
    this.allianceRepository = allianceRepository;
    this.groupRepository = groupRepository;
  }

  async process(dynamic){
    const group = await dynamic.getGroup();

    return await this.dynamicRepository.findWith(
      this.dynamicRepository.select()
        .inLocation(dynamic.location)
        .alive()
        .enemies(
          group.alliance,
          this.groupRepository,
          this.allianceRepository
        )
    );
  }
};
