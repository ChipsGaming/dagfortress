module.exports = class{
  constructor(templateName, model = {}){
    this.templateName = templateName;
    this.model = model;
  }

  async render(render){
    for(const child in this.model){
      if(typeof this.model[child] == 'object' && 'render' in this.model[child]){
        this.model[child] = await this.model[child].render(render);
      }
    }

    return render.render(this.templateName, this.model);
  }
};
