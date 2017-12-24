const Repository = require('../GroupRepository'),
  LazyLoader = require('../GroupLazyLoader');

module.exports = class{
  async build(options, container){
    Repository.lazyLoader = new LazyLoader(container);

    return new Repository(
      await container.get('Database').build({}, container)
    );
  }
};
