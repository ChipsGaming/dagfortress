const NullRoute = require('../Router/NullRoute');
const RegexRoute = require('../Router/RegexRoute');
const QueueRoute = require('../Router/QueueRoute');
const HelpHandler = require('../Handler/HelpHandler');
const PingHandler = require('../Handler/PingHandler');

module.exports = class{
  constructor(container){
    this.container = container;
  }

  listen(discord){
    this.discord = discord;

    discord.on('ready', this.onReady.bind(this));
    discord.on('message', this.onMessage.bind(this));
  }

  onReady(){
    console.log(`logged in as ${this.discord.user.tag}!`);
  }

  onMessage(message){
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
