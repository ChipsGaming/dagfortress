const NullRoute = require('../Router/NullRoute');
const RegexRoute = require('../Router/RegexRoute');
const QueueRoute = require('../Router/QueueRoute');

module.exports = class{
  constructor(container, player){
    this.container = container;
    this.player = player;
  }

  process(message, next){
    const match = new QueueRoute([
      new RegexRoute(/^help$/i, [], {
        middleware: new (require('./InWorldState/HelpHandler'))
      }),
      new RegexRoute(/^ping$/i, [], {
        middleware: new (require('./InWorldState/PingHandler'))(this.player)
      }),
      new RegexRoute(/^выйти$/i, [], {
        middleware: new (require('./InWorldState/ExitWorldHandler'))(this.container, this.player)
      }),
      new NullRoute({
        middleware: {
          process: function(){}
        }
      })
    ])
      .route(message)

    match.middleware.process(message, match);
  }
};
