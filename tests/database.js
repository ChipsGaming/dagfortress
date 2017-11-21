const container = require('./../src/container');
const WorldRepository = require('../src/Game/World/Repository/WorldRepository');
const World = require('../src/Game/World/World');
const LocationRepository = require('../src/Game/World/Location/Repository/LocationRepository');
const Location = require('../src/Game/World/Location/Location');
const RoadRepository = require('../src/Game/World/Location/Repository/RoadRepository');
const Road = require('../src/Game/World/Location/Road');
const ObjectRepository = require('../src/Game/Object/Repository/ObjectRepository');
const Object = require('../src/Game/Object/Object');
const DynamicRepository = require('../src/Game/Object/Dynamic/Repository/DynamicRepository');
const Dynamic = require('../src/Game/Object/Dynamic/Dynamic');
const PlayerRepository = require('../src/Game/Object/Dynamic/Player/Repository/PlayerRepository');
const Player = require('../src/Game/Object/Dynamic/Player/Player');
const OrganRepository = require('../src/Game/Object/Dynamic/Repository/OrganRepository');

container.get('Database').build({}, container)
/*
.then(async (db) => {
  const worldRepository = new WorldRepository(db);
  const locationRepository = new LocationRepository(db);

  const world = new World(
    123,
    'Тестовый мир',
    'Описание'
  );
  world.id = '1d89b866-61f1-4ca7-9bc9-946fc6c744a4';
  await worldRepository.save(world);

  const location = new Location(
    '1d89b866-61f1-4ca7-9bc9-946fc6c744a4',
    'Тестовая локация',
    'Описание'
  );
  location.id = '57c664c0-5a93-4e9b-9976-68fe26609c50';
  await locationRepository.save(location);
})
*/
.then(async (db) => {
  const objectRepository = new ObjectRepository(db);
  const dynamicRepository = new DynamicRepository(db);
  const playerRepository = new PlayerRepository(db);

  console.log(
    await dynamicRepository.select()
      .alive()
      .active()
      .build()
    .toString()
  );

  /*
  const object = new Object(
    '1d89b866-61f1-4ca7-9bc9-946fc6c744a4',
    '57c664c0-5a93-4e9b-9976-68fe26609c50',
    'Hello'
  );
  await objectRepository.save(object);
  
  const dynamic = new Dynamic(
    '1d89b866-61f1-4ca7-9bc9-946fc6c744a4',
    '57c664c0-5a93-4e9b-9976-68fe26609c50',
    'Hello'
  );
  dynamic.id = '8e620ea8-4070-48f0-addf-6d1f87d300b6';
  await dynamicRepository.save(dynamic);
  
  for(let dynamic of dynamicRepository.hydrateAll(await dynamicRepository.select().build())){
    console.log(dynamic);
  }
  
  const player = new Player(
    '1d89b866-61f1-4ca7-9bc9-946fc6c744a4',
    '57c664c0-5a93-4e9b-9976-68fe26609c50',
    'Hello',
    123321
  );
  await playerRepository.save(player);
  
  for(let player of playerRepository.hydrateAll(await playerRepository.select().build())){
    console.log(player);
  }
  */
})
/*
.then((db) => {
  return Promise.all([
    db.select('*').from('object'),
    db.select('*').from('dynamic'),
    db.select('*').from('player')
  ]);
})
.then(([objects, dynamics, player]) => {
  console.log(objects);
  console.log(dynamics);
  console.log(player);
});
*/
