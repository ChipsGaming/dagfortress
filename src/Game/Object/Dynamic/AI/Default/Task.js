module.exports = class{
  constructor(
    dynamic,
    taskRepository
  ){
    this.dynamic = dynamic;
    this.taskRepository = taskRepository;
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
};
