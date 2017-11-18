module.exports = class{
  /**
   * @param {Container} container
   */
  constructor(container){
    this.container = container;
  }

  /**
   * @return {QueueRoute} Используемый роутер.
   */
  getRouter(){
  }

  /**
   * @param {Object} match Соответствие роутера.
   *
   * @return {Handler} Обработчик.
   */
  async getHandler(match){
    return this.container.get(match.middleware).build(match, this.container);
  }

  async process(message){
    const match = this.getRouter().route(message),
      handler = await this.getHandler(match);

    return await handler.process(message, match);
  }
};
