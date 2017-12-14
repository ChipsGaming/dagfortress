const World = require('../World/World'),
  Chrono = require('../World/Chrono'),
  Location = require('../World/Location/Location'),
  Road = require('../World/Location/Road'),
  Dynamic = require('../Object/Dynamic/Dynamic'),
  Organ = require('../Object/Dynamic/Organ'),
  Alliance = require('../Object/Alliance'),
  Group = require('../Object/Group'),
  Task = require('../Object/Task/Task'),
  TaskCondition = require('../Object/Task/Condition'),
  TaskAction = require('../Object/Task/Action'),
  TaskReward = require('../Object/Task/Reward');

module.exports = class{
  constructor(){
    this.world = null;
    this.chrono = null;
    this.alliances = [];
    this.groups = [];
    this.tasks = [];
    this.tasksConditions = [];
    this.tasksActions = [];
    this.tasksRewards = [];
    this.locations = [];
    this.roads = [];
    this.dynamics = [];
    this.organs = [];
  }

  static fromJson(json){
    const worldJson = json.world;

    const worldBuilder = new this;
    worldBuilder.world = new World(
      worldJson.seed,
      worldJson.name,
      worldJson.description
    );

    worldBuilder.chrono = new Chrono(worldBuilder.world.id);
    if('chrono' in worldJson){
      worldBuilder.chrono = worldBuilder.chronoByJson(worldBuilder.world, worldJson.chrono);
    }

    for(let allianceJson of worldJson.alliances){
      if('prototype' in allianceJson){
        allianceJson = Object.assign(json.prototypes.alliance[allianceJson.prototype], allianceJson);
      }

      const alliance = worldBuilder.allianceByJson(worldBuilder.world, allianceJson);
      worldBuilder.addAlliance(alliance);

      for(let groupJson of allianceJson.groups){
        if('prototype' in groupJson){
          groupJson = Object.assign(json.prototypes.group[groupJson.prototype], groupJson);
        }

        const group = worldBuilder.groupByJson(alliance, groupJson);
        worldBuilder.addGroup(group);
      
        if('tasks' in groupJson){
          for(let taskJson of groupJson.tasks){
            if('prototype' in taskJson){
              taskJson = Object.assign(json.prototypes.task[taskJson.prototype], taskJson);
            }

            const task = worldBuilder.taskByJson(group, taskJson);
            worldBuilder.addTask(task);

            if('conditions' in taskJson){
              for(const taskConditionJson of taskJson.conditions){
                worldBuilder.addTaskCondition(
                  worldBuilder.taskConditionByJson(task, taskConditionJson)
                );
              }
            }
            if('actions' in taskJson){
              for(const taskActionJson of taskJson.actions){
                worldBuilder.addTaskAction(
                  worldBuilder.taskActionByJson(task, taskActionJson)
                );
              }
            }
            if('rewards' in taskJson){
              for(const taskRewardJson of taskJson.rewards){
                worldBuilder.addTaskReward(
                  worldBuilder.taskRewardByJson(task, taskRewardJson)
                );
              }
            }
          }
        }
      }
    }
    
    for(let locationJson of worldJson.locations){
      if('prototype' in locationJson){
        locationJson = Object.assign(json.prototypes.location[locationJson.prototype], locationJson);
      }

      const location = worldBuilder.locationByJson(worldBuilder.world, locationJson);
      worldBuilder.addLocation(location);
    
      if('roads' in locationJson){
        for(const locationName of locationJson.roads){
          worldBuilder.addRoad(
            worldBuilder.createRoad(location, worldBuilder.findLocationByName(locationName))
          );
        }
      }
    
      if('dynamics' in locationJson){
        for(let dynamicJson of locationJson.dynamics){
          if('prototype' in dynamicJson){
            dynamicJson = Object.assign(json.prototypes.dynamic[dynamicJson.prototype], dynamicJson);
          }

          const dynamic = worldBuilder.dynamicByJson(worldBuilder.world, location, dynamicJson);
          worldBuilder.addDynamic(dynamic);
    
          for(let organJson of dynamicJson.organs){
            if('prototype' in organJson){
              organJson = Object.assign(json.prototypes.organ[organJson.prototype], organJson);
            }

            worldBuilder.addOrgan(
              worldBuilder.organByJson(dynamic, organJson)
            );
          }
        }
      }
    }

    for(let allianceJson of worldJson.alliances){
      for(let groupJson of allianceJson.groups){
        if(!('startLocation' in groupJson)){
          continue;
        }

        const startLocation = worldBuilder.findLocationByName(groupJson.startLocation);
        if(startLocation === null){
          continue;
        }

        worldBuilder.findGroupByName(groupJson.name).startLocation = startLocation.id;
      }
    }

    return worldBuilder;
  }

  assign(object, json, properties = []){
    for(const prop of properties){
      if(prop in json){
        object[prop] = json[prop];
      }
    }

    return object;
  }

  // Getters
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

  hasTask(task){
    return this.tasks.indexOf(task) !== -1;
  }

  hasTaskCondition(taskCondition){
    return this.tasksConditions.indexOf(taskCondition) !== -1;
  }

  hasTaskAction(taskAction){
    return this.tasksActions.indexOf(taskAction) !== -1;
  }

  hasTaskReward(taskReward){
    return this.tasksRewards.indexOf(taskReward) !== -1;
  }

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

  hasRoad(road){
    return this.roads.indexOf(road) !== -1;
  }

  hasDynamic(dynamic){
    return this.dynamics.indexOf(dynamic) !== -1;
  }

  hasOrgan(organ){
    return this.organs.indexOf(organ) !== -1;
  }

  // Actions
  chronoByJson(world, json){
    world = world instanceof Object? world.id : world;

    return this.assign(
      new Chrono(world),
      json,
      ['day']
    );
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

    return this.assign(
      new Group(alliance, json.name),
      json,
      ['isPlayer']
    );
  }

  addTask(task){
    if(this.hasTask(task)){
      return;
    }

    this.tasks.push(task);
  }

  taskByJson(group, json){
    group = group instanceof Object? group.id : group;

    return this.assign(
      new Task(group, json.name, json.description),
      json,
      ['priority', 'isComplete']
    );
  }

  addTaskCondition(taskCondition){
    if(this.hasTaskCondition(taskCondition)){
      return;
    }

    this.tasksConditions.push(taskCondition);
  }

  taskConditionByJson(task, json){
    task = task instanceof Object? task.id : task;

    return this.assign(
      new TaskCondition(task, json.type),
      json,
      ['target']
    );
  }

  addTaskAction(taskAction){
    if(this.hasTaskAction(taskAction)){
      return;
    }

    this.tasksActions.push(taskAction);
  }

  taskActionByJson(task, json){
    task = task instanceof Object? task.id : task;

    return this.assign(
      new TaskAction(task, json.type),
      json,
      ['target']
    );
  }

  addTaskReward(taskReward){
    if(this.hasTaskReward(taskReward)){
      return;
    }

    this.tasksRewards.push(taskReward);
  }

  taskRewardByJson(task, json){
    task = task instanceof Object? task.id : task;

    return this.assign(
      new TaskReward(task, json.type),
      json,
      ['target']
    );
  }

  addLocation(location){
    if(this.hasLocation(location)){
      return;
    }

    this.locations.push(location);
  }

  locationByJson(world, json){
    world = world instanceof Object? world.id : world;

    return this.assign(
      new Location(world, json.name, json.description),
      json
    );
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

    const dynamic = this.assign(
      new Dynamic(world, location, this.findGroupByName(json.group).id, json.name),
      json,
      ['endurance', 'currentEndurance', 'isDie']
    );
    if('ai' in json){
      dynamic.ai = Object.assign(dynamic.ai, json.ai);
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

    return this.assign(
      new Organ(dynamic, json.name),
      json,
      ['damage', 'isVital', 'isWeapon', 'isLegs', 'isKeeping', 'mass']
    );
  }
};
