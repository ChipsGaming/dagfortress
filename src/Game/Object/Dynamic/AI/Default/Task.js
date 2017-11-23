module.exports = class{
  constructor(
    dynamic,
    taskRepository,
    taskContainer
  ){
    this.dynamic = dynamic;
    this.taskRepository = taskRepository;
    this.taskContainer = taskContainer;
  }

  /**
   * Выбирает текущую, актуальную задачу.
   *
   * @return {Task} Текущая, актуальная задача.
   */
  async getCurrentTask(){
    return this.taskRepository.findWith(
      this.taskRepository.select()
        .forGroup(this.dynamic.group)
        .actual()
        .orderByPriority()
    );
  }

  /**
   * Предоставляет способ выполнения задачи.
   *
   * @return {TaskPerformer} Алгоритм выполнения задачи.
   */
  async getTaskPerformer(task){
    return this.taskContainer.get(task.type).build({}, this.taskContainer);
  } 

  /**
   * Выполняет задачу.
   *
   * @param {TaskPerformer} performer Способ выполнения задачи.
   * @param {Task} task Выполняемая задача.
   */
  async performTask(performer, task){
    await performer.run(this.dynamic, task);
  }
};
