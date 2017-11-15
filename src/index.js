const container = require('./container');
const Game = require('./Game/Game');


Promise.all([
  container.get('Config').build({}, container),
  container.get('Discord').build({}, container)
])
  .then(function([config, discord]){
    new Game(container).listen(discord);

    discord.login(config.bot.token);
  });
