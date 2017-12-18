const RouteHandler = require('../RouteHandler'),
  NullRoute = require('../../Router/NullRoute'),
  RegexRoute = require('../../Router/RegexRoute'),
  QueueRoute = require('../../Router/QueueRoute'),
  WorldState = require('../../Game/World/WorldState'),
  Action = require('../../Game/Object/Task/Action'),
  ViewModelList = require('../../View/ViewModelList'),
  ViewModel = require('../../View/ViewModel'),
  PresetViewModel = require('../../View/PresetViewModel');

module.exports = class extends RouteHandler{
  constructor(
    container,
    player,
    globalEvents,
    worldRepository,
    chronoRepository,
    dynamicRepository,
    organRepository,
    taskRepository,
    taskConditionContainer,
    taskActionContainer,
    taskRewardContainer
  ){
    super(container);
    this.player = player;
    this.globalEvents = globalEvents;
    this.worldRepository = worldRepository;
    this.chronoRepository = chronoRepository;
    this.dynamicRepository = dynamicRepository;
    this.organRepository = organRepository;
    this.taskRepository = taskRepository;
    this.taskConditionContainer = taskConditionContainer;
    this.taskActionContainer = taskActionContainer;
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
      new RegexRoute(/^ж(?:дать)?$/i, ['count'], {
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
      return new PresetViewModel('Вы слишком устали для этого');
    }

    const world = await this.worldRepository.find('id', this.player.world);
    
    let view = await super.process(message);

    if(this.getActionPlayersCount(await world.getPlayers()) < 1){
      view = new ViewModelList([
        new ViewModel('in_world_state/action_state', {
          content: view
        })
      ], "\n");

      for(const dynamic of await world.getAliveDynamics()){
        if(!this.isActive(dynamic)){
          continue;
        }

        const ai = await (await dynamic.getGroup()).getAI();

        const task = await ai.getCurrentTask(dynamic);
        if(task === null){
          continue;
        }

        const actionPipe = await task.getActionsPipe(world, this.taskActionContainer);
        actionPipe.push(new Action(task.id, 'wait'));
        await actionPipe.run(dynamic, null, task);
      }

      const newState = new WorldState;
      newState.applyEvents(
        this.globalEvents,
        view
      );
      await newState.replaceCurrentState(
        this.dynamicRepository,
        this.organRepository
      );
      this.globalEvents.clear();

      for(const task of await world.getActualTasks()){
        let isCompleted = true;
        for(const condition of await task.getConditions()){
          const checking = await this.taskConditionContainer
            .get(condition.type)
            .build({
              condition: condition,
              task: task
            }, this.taskConditionContainer);
          isCompleted = isCompleted && await checking.check(task, condition, view);
        }
      
        if(isCompleted){
          task.isComplete = true;
          await this.taskRepository.save(task);
      
          for(const reward of await task.getRewards()){
            const rewarding = await this.taskRewardContainer
              .get(reward.type)
              .build({
                reward: reward,
                task: task
              }, this.taskRewardContainer);
            await rewarding.reward(task, reward, view);
          }
        }
      }
      
      const chrono = await world.getChrono();
      chrono.day++;
      await this.chronoRepository.save(chrono);
    }

    return view;
  }
};
