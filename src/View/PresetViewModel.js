module.exports = class{
  constructor(view){
    this.view = view;
  }

  async render(render){
    return this.view;
  }
};
