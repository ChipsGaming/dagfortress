const RouteHandler = require('../RouteHandler'),
  NullRoute = require('../../Router/NullRoute'),
  RegexRoute = require('../../Router/RegexRoute'),
  QueueRoute = require('../../Router/QueueRoute'),
  WorldState = require('../../Game/World/WorldState'),
  Action = require('../../Game/Object/Task/Action'),
  ViewModelList = require('../../View/ViewModelList'),
  ViewModel = require('../../View/ViewModel');

module.exports = class extends RouteHandler{
  constructor(
    container,
    player,
    globalEvents,
    aiContainer,
    worldRepository,
    chronoRepository,
    allianceRepository,
    groupRepository,
    dynamicRepository,
    playerRepository,
    organRepository,
    taskRepository,
    taskConditionRepository,
    taskConditionContainer,
    taskActionRepository,
    taskActionContainer,
    taskRewardRepository,
    taskRewardContainer
  ){
    super(container);
    this.player = player;
    this.globalEvents = globalEvents;
    this.aiContainer = aiContainer;
    this.worldRepository = worldRepository;
    this.chronoRepository = chronoRepository;
    this.allianceRepository = allianceRepository;
    this.groupRepository = groupRepository;
    this.dynamicRepository = dynamicRepository;
    this.playerRepository = playerRepository;
    this.organRepository = organRepository;
    this.taskRepository = taskRepository;
    this.taskConditionRepository = taskConditionRepository;
    this.taskConditionContainer = taskConditionContainer;
    this.taskActionRepository = taskActionRepository;
    this.taskActionContainer = taskActionContainer;
    this.taskRewardRepository = taskRewardRepository;
    this.taskRewardContainer = taskRewardContainer;
  }

  getRouter(){
    return new QueueRoute([
      new RegexRoute(/^п(?:ойти)? ([a-zа-я0-9- ]+)$/i, ['name'], {
        middleware: 'InWorldState/ActionState/EnterLocationHandler',
        player: this.player
      }),
      new RegexRoute(/^у(?:дарить)? .+$/i, [], {
        middleware: 'InWorldState/ActionState/AttackHandler',
        player: this.player
      }),
      new RegexRoute(/^ж(?:дать)?(?: (\d+))?$/i, ['count'], {
        middleware: 'InWorldState/ActionState/WaitHandler',
        player: this.player
      }),
      new NullRoute({
        middleware: 'NullHandler'
      })
    ]);
  }

  isActive(dynamic){
    return this.globalEvents.find((event) => event.publisher.id == dynamic.id).length < 1;
  }

  getActionPlayersCount(players){
    let actionPlayersCount = 0;
    for(const player of players){
      if(this.globalEvents.find((event) => event.publisher.id == player.id).length > 0){
        continue;
      }
      actionPlayersCount++;
    }

    return actionPlayersCount;
  }

  async process(message){
    if(!this.isActive(this.player)){
      return 'Вы слишком устали для этого';
    }

    const world = await this.worldRepository.find('id', this.player.world);
    
    let result = await super.process(message);

    if(this.getActionPlayersCount(await world.getPlayers(this.playerRepository)) < 1){
      result = new ViewModelList([
        new ViewModel('in_world_state/action_state', {
          content: result
        })
      ], "\n");

      for(const dynamic of await world.getAliveDynamics(this.dynamicRepository)){
        if(!this.isActive(dynamic)){
          continue;
        }

        const ai = await dynamic.getAI(this.aiContainer);

        const task = await ai.task.getCurrentTask();
        if(task === null){
          continue;
        }

        const actionPipe = await task.getActionsPipe(this.taskActionRepository, this.taskActionContainer);
        actionPipe.push(new Action(task.id, 'wait'));
        await actionPipe.run(dynamic, null, task);

        this.globalEvents.merge(dynamic.events);
      }

      const newState = new WorldState;
      newState.applyEvents(this.globalEvents);
      await newState.replaceCurrentState(
        this.dynamicRepository,
        this.organRepository
      );

      for(const event of this.globalEvents.events){
        switch(event.name){
          case 'Wait':
            result.add(new ViewModel('in_world_state/action_state/wait', event));
            break;
          case 'Move':
            result.add(new ViewModel('in_world_state/action_state/move', event));
            break;
          case 'Attacks':
            result.add(new ViewModel('in_world_state/action_state/attack', event));
            break;
        }
      }
      this.globalEvents.clear();
      
      const chrono = await world.getChrono(this.chronoRepository);
      chrono.day++;
      await this.chronoRepository.save(chrono);
      
      for(const task of await world.getActualTasks(this.taskRepository, this.allianceRepository, this.groupRepository)){
        let isCompleted = true;
        for(const condition of await task.getConditions(this.taskConditionRepository)){
          const checking = await this.taskConditionContainer
            .get(condition.type)
            .build({
              condition: condition,
              task: task
            }, this.taskConditionContainer);
          isCompleted = isCompleted && await checking.check(task, condition);
        }
      
        if(isCompleted){
          task.isComplete = true;
          await this.taskRepository.save(task);
      
          for(const reward of await task.getRewards(this.taskRewardRepository)){
            const rewarding = await this.taskRewardContainer
              .get(reward.type)
              .build({
                reward: reward,
                task: task
              }, this.taskRewardContainer);
            await rewarding.reward(task, reward);
          }
        }
      }
    }

    return result;
  }
};
