const NullRoute = require('../Router/NullRoute');
const RegexRoute = require('../Router/RegexRoute');
const QueueRoute = require('../Router/QueueRoute');

module.exports = class{
  constructor(container, player){
    this.container = container;
    this.player = player;
  }

  async process(message){
    const match = new QueueRoute([
      new RegexRoute(/^help$/i, [], {
        middleware: new (require('./InWorldState/HelpHandler'))
      }),
      new RegexRoute(/^ping$/i, [], {
        middleware: new (require('./InWorldState/PingHandler'))(this.player)
      }),
      new RegexRoute(/^осмотреться$/i, [], {
        middleware: new (require('./InWorldState/ViewLocationHandler'))(this.container, this.player)
      }),
      new RegexRoute(/^пойти ([a-zа-я0-9- ]+)$/i, ['name'], {
        middleware: new (require('./InWorldState/EnterLocationHandler'))(this.container, this.player)
      }),
      new RegexRoute(/^выйти$/i, [], {
        middleware: new (require('./InWorldState/ExitWorldHandler'))(this.container, this.player)
      }),
      new NullRoute({
        middleware: {
          process: async function(){}
        }
      })
    ])
      .route(message);
    
    return match.middleware.process(message, match);
  }
};
