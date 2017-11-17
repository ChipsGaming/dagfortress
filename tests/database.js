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

container.get('Database').build({}, container)
.then(async (db) => {
  const dynamicRepository = new DynamicRepository(db);

  const dynamic = await dynamicRepository.find('id', 'd330a862-b1b7-4248-856d-17ce0fdfb443');

  /*
  const object = new Object(
    '1d89b866-61f1-4ca7-9bc9-946fc6c744a4',
    '57c664c0-5a93-4e9b-9976-68fe26609c50',
    'Hello'
  );
  objectRepository.save(object).then();
  
  const dynamic = new Dynamic(
    '1d89b866-61f1-4ca7-9bc9-946fc6c744a4',
    '57c664c0-5a93-4e9b-9976-68fe26609c50',
    'Hello'
  );
  dynamicRepository.save(dynamic).then(function(){
    console.log(1);
  });
  */


  return db;
})
/*
.then((db) => {
  return Promise.all([
    db.select('*').from('object'),
    db.select('*').from('dynamic')
  ]);
})
.then(([objects, dynamics]) => {
  console.log(objects);
  console.log(dynamics);
});
*/
/*
.then((data) => {
  console.log(data);
});
*/

    /*
    function method(x, y){
      return new Promise(function(resolve){
        resolve(x + y)
      });
    }
    
    async function runer(){
      const result = await method(1, 2);
    
      return result;
    }
    
    runer().then(function(data){
      console.log(data);
    });
    */
