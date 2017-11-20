module.exports = class{
  constructor(mustache, templateResolver, helpers){
    this.mustache = mustache;
    this.templateResolver = templateResolver;
    this.helpers = helpers;
  }

  async render(viewModel){
    return this.mustache.render(
      await this.templateResolver.resolve(viewModel.templateName),
      Object.assign(
        this.helpers,
        viewModel.model
      )
    );
  }
};
