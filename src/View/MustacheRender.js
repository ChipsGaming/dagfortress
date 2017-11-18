module.exports = class{
  constructor(mustache, templateResolver){
    this.mustache = mustache;
    this.templateResolver = templateResolver;
  }

  async render(viewModel){
    return this.mustache.render(
      await this.templateResolver.resolve(viewModel.templateName),
      viewModel.model
    );
  }
};
