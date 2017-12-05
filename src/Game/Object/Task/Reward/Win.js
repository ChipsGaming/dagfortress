module.exports = class{
  constructor(container){
    this.container = container;
  }

  async reward(task, reward){
    const alliance = await (await task.getGroup()).getAlliance();

    alliance.win(
      await this.container.get('EventJournal').build({world: alliance.world}, this.container)
    );
  }
};
