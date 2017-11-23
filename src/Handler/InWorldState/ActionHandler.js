const RouteHandler = require('../RouteHandler');
const NullRoute = require('../../Router/NullRoute');
const RegexRoute = require('../../Router/RegexRoute');
const QueueRoute = require('../../Router/QueueRoute');
const ViewModel = require('../../View/ViewModel');

module.exports = class extends RouteHandler{
  /**
   * @param {HandlersContainer} container
   * @param {Player} player
   * @param {DynamicRepository} dynamicRepository
   * @param {PlayerRepository} playerRepository
   */
  constructor(
    container,
    player,
    aiContainer,
    tasksContainer,
    chronoRepository,
    dynamicRepository,
    playerRepository,
    taskRepository
  ){
    super(container);
    this.player = player;
    this.aiContainer = aiContainer;
    this.tasksContainer = tasksContainer;
    this.chronoRepository = chronoRepository;
    this.dynamicRepository = dynamicRepository;
    this.playerRepository = playerRepository;
    this.taskRepository = taskRepository;
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

  async process(message){
    if(this.player.currentEndurance < 1){
      return 'Вы слишком устали для этого';
    }
    
    let result = await super.process(message);
    
    const activePlayersCount = await this.playerRepository.getScalar(
      this.playerRepository.select()
        .alive()
        .active()
        .count()
    );
    if(activePlayersCount < 1){
      result = await this.completeStage(result);
    }

    return result;
  }

  async completeStage(result){
    const dynamics = await this.dynamicRepository.fetchAll(
      this.dynamicRepository.select()
        .inWorld(this.player.world)
    );
    let activeDynamicsCount = dynamics.length;
    while(activeDynamicsCount > 0){
      for(const dynamic of dynamics){
        if(dynamic.currentEndurance < 1){
          activeDynamicsCount--;
          continue;
        }
      
        const ai = await dynamic.getAI(this.aiContainer);
      
        const task = await ai.task.getCurrentTask();
        if(task === null){
          dynamic.currentEndurance = 0;
          continue;
        }
      
        await ai.task.performTask(
          await ai.task.getTaskPerformer(task),
          task
        );
      
        await this.dynamicRepository.save(dynamic);
      }
    }

    const tasks = await this.taskRepository.fetchAll(
      this.taskRepository.select()
        .actual()
    );
    for(const task of tasks){
      const taskChecking = await this.tasksContainer.get(task.type).build({}, this.tasksContainer);
      if(await taskChecking.check(task)){
        task.isComplete = true;
        await this.taskRepository.save(task);
      }
    }

    for(const dynamic of dynamics){
      dynamic.currentEndurance = dynamic.endurance;
      await this.dynamicRepository.save(dynamic);
    }

    const chrono = await this.chronoRepository.find('world', this.player.world);
    chrono.day++;
    await this.chronoRepository.save(chrono);

    return new ViewModel('in_world_state/action_state', {
      content: result
    });
  }
};
