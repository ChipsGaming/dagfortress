const Container = require('./Container/Container');
const SharingFactory = require('./Container/Factory/SharingFactory');
const ConfigFactory = require('./config');
const DiscordFactory = require('./Game/Container/DiscordFactory');
const DatabaseFactory = require('./Storage/Container/DatabaseFactory');
const WorldRepositoryFactory = require('./Game/World/Repository/Container/WorldRepositoryFactory');
const PlayerRepositoryFactory = require('./Game/Player/Repository/Container/PlayerRepositoryFactory');

module.exports = new Container({
  'config_path': process.argv[2]? process.argv[2] : './config/config.json',
  'Config': new SharingFactory(new ConfigFactory),
  'Discord': new SharingFactory(new DiscordFactory),
  'Database': new SharingFactory(new DatabaseFactory),

  // Repository
  'WorldRepository': new SharingFactory(new WorldRepositoryFactory),
  'PlayerRepository': new SharingFactory(new PlayerRepositoryFactory)
});
