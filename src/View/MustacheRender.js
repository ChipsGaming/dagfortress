module.exports = class{
  constructor(mustache, templateResolver){
    this.mustache = mustache;
    this.templateResolver = templateResolver;
  }

  render(viewModel){
    return this.templateResolver.resolve(viewModel.templateName)
      .then(function(template){
        return this.mustache
          .render(template, viewModel.model)
      }.bind(this));
  }
};
