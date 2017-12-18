module.exports = class{
  static async factory(options, container){
    return new this(
      await container.get('TaskRepository').build({}, container)
    );
  }

  constructor(
    taskRepository
  ){
    this.taskRepository = taskRepository;
  }

  async process(dynamic){
    return this.taskRepository.findWith(
      this.taskRepository.select()
        .forGroup(dynamic.group)
        .actual()
        .orderByPriority()
    );
  }
}
