const Repository = require('../TaskRepository'),
  LazyLoader = require('../TaskLazyLoader');

module.exports = class{
  async build(options, container){
    Repository.lazyLoader = new LazyLoader(container);

    return new Repository(
      await container.get('Database').build({}, container)
    );
  }
};
