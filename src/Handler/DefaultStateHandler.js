const NullRoute = require('../Router/NullRoute');
const RegexRoute = require('../Router/RegexRoute');
const QueueRoute = require('../Router/QueueRoute');

module.exports = class{
  constructor(container){
    this.container = container;
  }

  process(message, next){
    const match = new QueueRoute([
      new RegexRoute(/^help$/i, [], {
        middleware: new (require('./DefaultState/HelpHandler'))
      }),
      new RegexRoute(/^ping$/i, [], {
        middleware: new (require('./DefaultState/PingHandler'))
      }),
      new RegexRoute(/^список$/i, [], {
        middleware: new (require('./DefaultState/WorldListHandler'))(this.container)
      }),
      new RegexRoute(/^создать (\d+)$/i, ['seed'], {
        middleware: new (require('./DefaultState/CreateWorldHandler'))(this.container)
      }),
      new RegexRoute(/^войти ([\w\d ]+)$/i, ['name'], {
        middleware: new (require('./DefaultState/EnterWorldHandler'))(this.container)
      }),
      new NullRoute({
        middleware: {
          process: function(){}
        }
      })
    ])
      .route(message)

    return match.middleware.process(message, match);
  }
};
