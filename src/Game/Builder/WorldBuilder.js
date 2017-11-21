const World = require('../World/World'),
  Location = require('../World/Location/Location'),
  Road = require('../World/Location/Road'),
  Dynamic = require('../Object/Dynamic/Dynamic'),
  Organ = require('../Object/Dynamic/Organ'),
  Alliance = require('../Object/Alliance'),
  Group = require('../Object/Group'),
  Task = require('../Object/Task');

module.exports = class{
  constructor(){
    this.world = null;
    this.locations = [];
    this.roads = [];
    this.dynamics = [];
    this.organs = [];
    this.alliances = [];
    this.groups = [];
    this.tasks = [];
  }

  static fromJson(json){
    const worldBuilder = new this;
    worldBuilder.world = new World(
      json.seed,
      json.name,
      json.description
    );

    for(const allianceJson of json.alliances){
      const alliance = worldBuilder.allianceByJson(worldBuilder.world, allianceJson);
      worldBuilder.addAlliance(alliance);

      for(const groupJson of allianceJson.groups){
        const group = worldBuilder.groupByJson(alliance, groupJson);
        worldBuilder.addGroup(group);
      
        if('tasks' in groupJson){
          for(const taskJson of groupJson.tasks){
            worldBuilder.addTask(
              worldBuilder.taskByJson(group, taskJson)
            );
          }
        }
      }
    }
    
    for(const locationJson of json.locations){
      const location = worldBuilder.locationByJson(worldBuilder.world, locationJson);
      worldBuilder.addLocation(location);
    
      if('roads' in locationJson){
        for(const locationName of locationJson.roads){
          worldBuilder.addRoad(
            worldBuilder.createRoad(location, worldBuilder.findLocationByName(locationName))
          );
        }
      }
    
      if('mobs' in locationJson){
        for(const mobJson of locationJson.mobs){
          const dynamic = worldBuilder.dynamicByJson(worldBuilder.world, location, mobJson);
          worldBuilder.addDynamic(dynamic);
    
          for(const organJson of mobJson.organs){
            worldBuilder.addOrgan(
              worldBuilder.organByJson(dynamic, organJson)
            );
          }
        }
      }
    }

    return worldBuilder;
  }

  // Getters
  hasLocation(location){
    return this.locations.indexOf(location) !== -1;
  }

  findLocationByName(name){
    for(const location of this.locations){
      if(location.name == name){
        return location;
      }
    }
  }

  findStartLocation(){
    for(const location of this.locations){
      if(location.isStart){
        return location;
      }
    }
  }

  hasRoad(road){
    return this.roads.indexOf(road) !== -1;
  }

  hasDynamic(dynamic){
    return this.dynamics.indexOf(dynamic) !== -1;
  }

  hasOrgan(organ){
    return this.organs.indexOf(organ) !== -1;
  }

  hasAlliance(alliance){
    return this.alliances.indexOf(alliance) !== -1;
  }

  hasGroup(group){
    return this.groups.indexOf(group) !== -1;
  }

  findGroupByName(name){
    for(const group of this.groups){
      if(group.name == name){
        return group;
      }
    }
  }

  findGroupPlayer(){
    for(const group of this.groups){
      if(group.isPlayer){
        return group;
      }
    }
  }

  hasTask(task){
    return this.tasks.indexOf(task) !== -1;
  }

  // Actions
  addLocation(location){
    if(this.hasLocation(location)){
      return;
    }

    this.locations.push(location);
  }

  locationByJson(world, json){
    world = world instanceof Object? world.id : world;

    const location = new Location(
      world,
      json.name,
      json.description
    );
    for(const prop of ['isStart']){
      if(prop in json){
        location[prop] = json[prop];
      }
    }

    return location;
  }

  addRoad(road){
    if(this.hasRoad(road)){
      return;
    }

    this.roads.push(road);
  }

  createRoad(locationStart, locationEnd){
    locationStart = locationStart instanceof Object? locationStart.id : locationStart;
    locationEnd = locationEnd instanceof Object? locationEnd.id : locationEnd;
    return new Road(locationStart, locationEnd);
  }

  addDynamic(dynamic){
    if(this.hasDynamic(dynamic)){
      return;
    }

    this.dynamics.push(dynamic);
  }

  dynamicByJson(world, location, json){
    world = world instanceof Object? world.id : world;
    location = location instanceof Object? location.id : location;

    const dynamic = new Dynamic(
      world,
      location,
      this.findGroupByName(json.group).id,
      json.name
    );
    for(const prop of ['endurance', 'currentEndurance', 'isDie']){
      if(prop in json){
        organ[prop] = json[prop];
      }
    }

    return dynamic;
  }

  addOrgan(organ){
    if(this.hasOrgan(organ)){
      return;
    }

    this.organs.push(organ);
  }

  organByJson(dynamic, json){
    dynamic = dynamic instanceof Object? dynamic.id : dynamic;

    const organ = new Organ(
      dynamic,
      json.name
    );
    for(const prop of ['damage', 'isVital', 'isWeapon', 'isLegs', 'isKeeping', 'mass']){
      if(prop in json){
        organ[prop] = json[prop];
      }
    }

    return organ;
  }

  addAlliance(alliance){
    if(this.hasAlliance(alliance)){
      return;
    }

    this.alliances.push(alliance);
  }

  allianceByJson(world, json){
    world = world instanceof Object? world.id : world;

    return new Alliance(
      world,
      json.name
    );
  }

  addGroup(group){
    if(this.hasGroup(group)){
      return;
    }

    this.groups.push(group);
  }

  groupByJson(alliance, json){
    alliance = alliance instanceof Object? alliance.id : alliance;

    const group = new Group(
      alliance,
      json.name
    );
    for(const prop of ['isPlayer']){
      if(prop in json){
        group[prop] = json[prop];
      }
    }

    return group;
  }

  addTask(task){
    if(this.hasTask(task)){
      return;
    }

    this.tasks.push(task);
  }

  taskByJson(group, json){
    group = group instanceof Object? group.id : group;

    return new Task(
      group,
      json.type,
      json.target,
      json.name,
      json.description
    );
  }
};
