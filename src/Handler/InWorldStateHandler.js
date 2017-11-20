const RouteHandler = require('./RouteHandler');
const NullRoute = require('../Router/NullRoute');
const RegexRoute = require('../Router/RegexRoute');
const QueueRoute = require('../Router/QueueRoute');

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
      new RegexRoute(/^help$/i, [], {
        middleware: 'InWorldState/HelpHandler',
        player: this.player
      }),
      new RegexRoute(/^ping$/i, [], {
        middleware: 'InWorldState/PingHandler',
        player: this.player
      }),
      new RegexRoute(/^осмотреть$/i, [], {
        middleware: 'InWorldState/ViewLocationHandler',
        player: this.player
      }),
      new RegexRoute(/^осмотреть себя$/i, [], {
        middleware: 'InWorldState/SelfStateHandler',
        player: this.player
      }),
      new RegexRoute(/^осмотреть (.+)$/i, ['target'], {
        middleware: 'InWorldState/ObjectStateHandler',
        player: this.player
      }),
      new RegexRoute(/^(пойти|ударить) /i, [], {
        middleware: 'InWorldState/ActionHandler',
        player: this.player
      }),
      new RegexRoute(/^выйти$/i, [], {
        middleware: 'InWorldState/ExitWorldHandler',
        player: this.player
      }),
      new NullRoute({
        middleware: 'NullHandler'
      })
    ]);
  }

  async process(message){
    if(this.player.isDie){
      return 'Вы мертвы';
    }
    
    return await super.process(message);
  }
};
