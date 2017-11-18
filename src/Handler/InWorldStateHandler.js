const NullRoute = require('../Router/NullRoute');
const RegexRoute = require('../Router/RegexRoute');
const QueueRoute = require('../Router/QueueRoute');

module.exports = class{
  /**
   * @param {HandlersContainer} container
   * @param {Player} player
   */
  constructor(container, player){
    this.container = container;
    this.player = player;
  }

  async process(message){
    const match = new QueueRoute([
      new RegexRoute(/^help$/i, [], {
        middleware: 'InWorldState/HelpHandler'
      }),
      new RegexRoute(/^ping$/i, [], {
        middleware: 'InWorldState/PingHandler'
      }),
      new RegexRoute(/^осмотреться$/i, [], {
        middleware: 'InWorldState/ViewLocationHandler'
      }),
      new RegexRoute(/^пойти ([a-zа-я0-9- ]+)$/i, ['name'], {
        middleware: 'InWorldState/EnterLocationHandler'
      }),
      new RegexRoute(/^выйти$/i, [], {
        middleware: 'InWorldState/ExitWorldHandler'
      }),
      new NullRoute({
        middleware: 'NullHandler'
      })
    ])
      .route(message);

    const handler = await this.container.get(match.middleware)
      .build({
        player: this.player
      }, this.container);

    return await handler.process(message, match);
  }
};
