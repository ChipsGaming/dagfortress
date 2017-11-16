const Container = require('./Container/Container');
const SharingFactory = require('./Container/Factory/SharingFactory');

module.exports = new Container({
  'config_path': process.argv[2]? process.argv[2] : './config/config.json',
  'Config': new SharingFactory(new (require('./config'))),
  'Discord': new SharingFactory(new (require('./Game/Container/DiscordFactory'))),
  'Database': new SharingFactory(new (require('./Storage/Container/DatabaseFactory'))),
  'Render': new SharingFactory(new (require('./View/Container/RenderFactory'))),

  // Repository
  'WorldRepository': new SharingFactory(new (require('./Game/World/Repository/Container/WorldRepositoryFactory'))),
  'PlayerRepository': new SharingFactory(new (require('./Game/Player/Repository/Container/PlayerRepositoryFactory'))),
  'LocationRepository': new SharingFactory(new (require('./Game/World/Location/Repository/Container/LocationRepositoryFactory'))),
  'RoadRepository': new SharingFactory(new (require('./Game/World/Location/Repository/Container/RoadRepositoryFactory')))
});
