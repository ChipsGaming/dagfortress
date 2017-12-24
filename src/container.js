const Container = require('./Container/Container');
const SharingFactory = require('./Container/Factory/SharingFactory');
const InvokableFactory = require('./Container/Factory/InvokableFactory');

module.exports = new Container({
  'config_path': process.argv[2]? process.argv[2] : __dirname + '/../config/config.json',
  'Config': new SharingFactory(new (require('./config'))),
  'Discord': new SharingFactory(new (require('./Game/Container/DiscordFactory'))),
  'Database': new SharingFactory(new (require('./Storage/Container/DatabaseFactory'))),
  'EventJournal': new (require('./Event/Container/GlobalEventJournalFactory')),
  'Render': new SharingFactory(new (require('./View/Container/RenderFactory'))),
  'ViewHelpers': new SharingFactory(new (require('./View/Container/HelpersFactory'))),

  // Repository
  'WorldRepository': new SharingFactory(new (require('./Game/World/Repository/Container/WorldRepositoryFactory'))),
  'ChronoRepository': new SharingFactory(new (require('./Game/World/Repository/Container/ChronoRepositoryFactory'))),
  'LocationRepository': new SharingFactory(new (require('./Game/World/Location/Repository/Container/LocationRepositoryFactory'))),
  'RoadRepository': new SharingFactory(new (require('./Game/World/Location/Repository/Container/RoadRepositoryFactory'))),
  // --Object
  'AllianceRepository': new SharingFactory(new (require('./Game/Object/Dynamic/Repository/Container/AllianceRepositoryFactory'))),
  'GroupRepository': new SharingFactory(new (require('./Game/Object/Dynamic/Repository/Container/GroupRepositoryFactory'))),
  'TaskRepository': new SharingFactory(new (require('./Game/Object/Task/Repository/Container/TaskRepositoryFactory'))),
  'TaskConditionRepository': new SharingFactory(new (require('./Game/Object/Task/Repository/Container/ConditionRepositoryFactory'))),
  'TaskActionRepository': new SharingFactory(new (require('./Game/Object/Task/Repository/Container/ActionRepositoryFactory'))),
  'TaskRewardRepository': new SharingFactory(new (require('./Game/Object/Task/Repository/Container/RewardRepositoryFactory'))),
  // ----Dynamic
  'DynamicRepository': new SharingFactory(new (require('./Game/Object/Dynamic/Repository/Container/DynamicRepositoryFactory'))),
  'PlayerRepository': new SharingFactory(new (require('./Game/Object/Dynamic/Player/Repository/Container/PlayerRepositoryFactory'))),
  // ----Static
  'ItemRepository': new SharingFactory(new (require('./Game/Object/Static/Repository/Container/ItemRepositoryFactory'))),

  // AI
  'AI': new (require('./Game/Object/Dynamic/AI/Container/AIFactory')),

  // Task
  'TaskActionContainer': new SharingFactory(new (require('./Game/Object/Task/Action/Container/ActionContainerFactory'))),
  'TaskConditionContainer': new SharingFactory(new (require('./Game/Object/Task/Condition/Container/ConditionContainerFactory'))),
  'TaskRewardContainer': new SharingFactory(new (require('./Game/Object/Task/Reward/Container/RewardContainerFactory'))),

  // Generator
  'PrototypeList': new SharingFactory(new (require('./Game/Builder/Container/PrototypeListFactory'))),

  // Handler
  'HandlersContainer': new SharingFactory(new (require('./Handler/Container/HandlersContainerFactory'))),
  'DefaultStateHandler': new SharingFactory(new (require('./Handler/Container/DefaultStateHandlerFactory'))),
  'InWorldStateHandler': new (require('./Handler/Container/InWorldStateHandlerFactory'))
});
