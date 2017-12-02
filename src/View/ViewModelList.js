module.exports = class{
  constructor(viewModels = [], delimiter = ''){
    this.views = viewModels;
    this.delimiter = delimiter;
  }

  add(viewModel){
    this.views.push(viewModel);
  }

  async render(render){
    let result = await Promise.all(this.views.map(async (view) => {
      return await view.render(render);
    }));

    return result.join(this.delimiter);
  }
};
