const RouteHandler = require('./RouteHandler'),
  NullRoute = require('../Router/NullRoute'),
  RegexRoute = require('../Router/RegexRoute'),
  QueueRoute = require('../Router/QueueRoute'),
  PresetViewModel = require('../View/PresetViewModel');

module.exports = class extends RouteHandler{
  /**
   * @param {HandlersContainer} container
   * @param {Player} player
   */
  constructor(container, player){
    super(container);
    this.player = player;
  }

  getRouter(){
    return new QueueRoute([
      new RegexRoute(/^h(?:elp)?$/i, [], {
        middleware: 'InWorldState/HelpHandler',
        player: this.player
      }),
      new RegexRoute(/^p(?:ing)?$/i, [], {
        middleware: 'InWorldState/PingHandler',
        player: this.player
      }),
      new RegexRoute(/^з(?:адачи)?$/i, [], {
        middleware: 'InWorldState/TaskListHandler',
        player: this.player
      }),
      new RegexRoute(/^о(?:смотреть)?$/i, [], {
        middleware: 'InWorldState/ViewLocationHandler',
        player: this.player
      }),
      new RegexRoute(/^о(?:смотреть)? себя$/i, [], {
        middleware: 'InWorldState/SelfStateHandler',
        player: this.player
      }),
      new RegexRoute(/^о(?:смотреть)? (.+)$/i, ['target'], {
        middleware: 'InWorldState/ObjectStateHandler',
        player: this.player
      }),
      new RegexRoute(/^(п(?:ойти)? |у(?:дарить)? |взять |положить |ж(?:дать)?)/i, [], {
        middleware: 'InWorldState/ActionHandler',
        player: this.player
      }),
      new RegexRoute(/^выйти?$/i, [], {
        middleware: 'InWorldState/ExitWorldHandler',
        player: this.player
      }),
      new RegexRoute(/^k(?:ick)? (.+)$/i, ['target'], {
        middleware: 'InWorldState/CreatorState/KickHandler',
        player: this.player
      }),
      new RegexRoute(/^r(?:eset)?$/i, [], {
        middleware: 'InWorldState/CreatorState/ResetHandler',
        player: this.player
      }),
      new NullRoute({
        middleware: 'NullHandler'
      })
    ]);
  }

  async process(message){
    if(this.player.isDie){
      return new PresetViewModel('Вы мертвы');
    }
    
    return await super.process(message);
  }
};
