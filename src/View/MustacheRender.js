module.exports = class{
  constructor(mustache, templateResolver, helpers = {}){
    this.mustache = mustache;
    this.templateResolver = templateResolver;
    this.helpers = helpers;
  }

  async render(templateName, model){
    return this.mustache.render(
      await this.templateResolver.resolve(templateName),
      Object.assign(
        this.helpers,
        model
      )
    );
  }
};
