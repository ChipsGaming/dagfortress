const Container = require('./Container/Container');
const SharingFactory = require('./Container/Factory/SharingFactory');
const InvokableFactory = require('./Container/Factory/InvokableFactory');

module.exports = new Container({
  'config_path': process.argv[2]? process.argv[2] : './config/config.json',
  'Config': new SharingFactory(new (require('./config'))),
  'Discord': new SharingFactory(new (require('./Game/Container/DiscordFactory'))),
  'Database': new SharingFactory(new (require('./Storage/Container/DatabaseFactory'))),
  'Render': new SharingFactory(new (require('./View/Container/RenderFactory'))),

  // Repository
  'WorldRepository': new SharingFactory(new (require('./Game/World/Repository/Container/WorldRepositoryFactory'))),
  'LocationRepository': new SharingFactory(new (require('./Game/World/Location/Repository/Container/LocationRepositoryFactory'))),
  'RoadRepository': new SharingFactory(new (require('./Game/World/Location/Repository/Container/RoadRepositoryFactory'))),
  // --Dynamic
  'DynamicRepository': new SharingFactory(new (require('./Game/Object/Dynamic/Repository/Container/DynamicRepositoryFactory'))),
  'OrganRepository': new SharingFactory(new (require('./Game/Object/Dynamic/Repository/Container/OrganRepositoryFactory'))),
  'PlayerRepository': new SharingFactory(new (require('./Game/Object/Dynamic/Player/Repository/Container/PlayerRepositoryFactory'))),

  // Generator
  'WorldGenerator': new SharingFactory(new (require('./Game/World/Generator/Container/WorldRandomGeneratorFactory'))),
  'LocationGenerator': new SharingFactory(new (require('./Game/World/Location/Generator/Container/LocationRandomGeneratorFactory'))),

  // Handler
  'HandlersContainer': new SharingFactory(new (require('./Handler/Container/HandlersContainerFactory'))),
  'DefaultStateHandler': new (require('./Handler/Container/DefaultStateHandlerFactory')),
  'InWorldStateHandler': new (require('./Handler/Container/InWorldStateHandlerFactory'))
});
