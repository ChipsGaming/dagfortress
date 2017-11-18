module.exports = class{
  constructor(templateName, model = {}){
    this.templateName = templateName;
    this.model = model;
  }

  async render(render){
    for(const child in this.model){
      if(this.model[child] instanceof this.constructor){
        this.model[child] = await render.render(this.model[child]);
      }
    }

    return render.render(this);
  }
};
