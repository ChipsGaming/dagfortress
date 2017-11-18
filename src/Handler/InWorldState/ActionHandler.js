const RouteHandler = require('../RouteHandler');
const NullRoute = require('../../Router/NullRoute');
const RegexRoute = require('../../Router/RegexRoute');
const QueueRoute = require('../../Router/QueueRoute');
const ViewModel = require('../../View/ViewModel');

module.exports = class extends RouteHandler{
  /**
   * @param {HandlersContainer} container
   * @param {Player} player
   * @param {DynamicRepository} dynamicRepository
   * @param {PlayerRepository} playerRepository
   */
  constructor(
    container,
    player,
    dynamicRepository,
    playerRepository
  ){
    super(container);
    this.player = player;
    this.dynamicRepository = dynamicRepository;
    this.playerRepository = playerRepository;
  }

  getRouter(){
    return new QueueRoute([
      new RegexRoute(/^пойти ([a-zа-я0-9- ]+)$/i, ['name'], {
        middleware: 'InWorldState/ActionState/EnterLocationHandler',
        player: this.player
      }),
      new RegexRoute(/^ударить (.+)$/i, ['name'], {
        middleware: 'InWorldState/ActionState/AttackHandler',
        player: this.player
      }),
      new NullRoute({
        middleware: 'NullHandler'
      })
    ]);
  }

  async process(message){
    if(this.player.currentEndurance == 0){
      return;
    }
    
    let result = await super.process(message);
    
    const actionsCount = this.player.events.find(['EnterLocation', 'Attacks']).length;
    if(actionsCount > 0){
      this.player.currentEndurance -= actionsCount;
    
      await this.playerRepository.save(this.player);
    }

    const activePlayersCount = await this.playerRepository.select()
      .build()
      .where('dynamic.currentEndurance', '>', 0)
      .where('dynamic.isDie', '!=', true)
      .count('object.id as count');
    if(parseInt(activePlayersCount[0].count) < 1){
      const dynamics = await this.dynamicRepository.select()
        .build()
        .where('object.world', this.player.world);

      for(let dynamic of await this.dynamicRepository.hydrateAll(dynamics)){
        dynamic.currentEndurance = dynamic.endurance;
        await this.dynamicRepository.save(dynamic);
      }

      result = new ViewModel('in_world_state/action_state', {
        content: result
      });
    }

    return result;
  }
};
