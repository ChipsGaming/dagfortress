module.exports = class{
  constructor(
    playerRepository
  ){
    this.playerRepository = playerRepository;
  }

  async check(task, condition, view){
    const alliance = await (await task.getGroup()).getAlliance();

    const alivePlayersCount = await this.playerRepository.getScalar(
      this.playerRepository.select()
        .inWorld(alliance.world)
        .alive()
        .count()
    );

    return alivePlayersCount < 1;
  }
};
