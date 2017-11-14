const RegexRoute = require('../Router/RegexRoute');
const QueueRoute = require('../Router/QueueRoute');
const HelpMiddleware = require('../Middleware/Help/HelpMiddleware');

module.exports = class{
  constructor(container){
    this.container = container;
  }

  run(){
    if(process.argv[2] === undefined){
      throw new Error('Config file not set. Run "nodejs src/index.js path/to/config.json"');
    }

    Promise.all([
      this.container.get('Config').build(process.argv[2]),
      this.container.get('Discord').build()
    ])
      .then(function([config, discord]){
        discord.on('ready', () => {
          console.log(`Logged in as ${discord.user.tag}!`);
        });
        
        discord.on('message', message => {
          const match = new QueueRoute([
            new RegexRoute(/^help$/i, [], {
              middleware: new HelpMiddleware
            })
          ]).route(message);

          if(match === null){
            return;
          }

          match.middleware.process(message);
        });
        
        discord.login(config.bot.token);
      });
  }
};
