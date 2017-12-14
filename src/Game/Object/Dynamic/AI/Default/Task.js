module.exports = class{
  static async factory(options, container){
    return new this(
      options.dynamic,
      await container.get('TaskRepository').build({}, container)
    );
  }

  constructor(
    dynamic,
    taskRepository
  ){
    this.dynamic = dynamic;
    this.taskRepository = taskRepository;
  }

  async getCurrentTask(){
    return this.taskRepository.findWith(
      this.taskRepository.select()
        .forGroup(this.dynamic.group)
        .actual()
        .orderByPriority()
    );
  }
}
