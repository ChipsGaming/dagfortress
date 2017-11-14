const Container = require('./Container/Container');
const ConfigFactory = require('./config');
const DiscordFactory = require('./Game/Container/DiscordFactory');

module.exports = new Container({
  'Config': new ConfigFactory,
  'Discord': new DiscordFactory
});
