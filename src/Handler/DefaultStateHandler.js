const NullRoute = require('../Router/NullRoute');
const RegexRoute = require('../Router/RegexRoute');
const QueueRoute = require('../Router/QueueRoute');
const HelpHandler = require('./DefaultState/HelpHandler');
const PingHandler = require('./DefaultState/PingHandler');

module.exports = class{
  constructor(container){
    this.container = container;
  }

  process(message, next){
    const match = new QueueRoute([
      new RegexRoute(/^help$/i, [], {
        middleware: new HelpHandler
      }),
      new RegexRoute(/^ping$/i, [], {
        middleware: new PingHandler
      }),
      new NullRoute({
        middleware: {
          process: function(){}
        }
      })
    ])
      .route(message)
      .middleware
      .process(message);
  }
};
