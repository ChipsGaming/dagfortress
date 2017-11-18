const fs = require('fs');
const Util = require('util');
const WorldRandomGenerator = require('../WorldRandomGenerator');

module.exports = class{
  async build(options, container){
    const config = await container.get('Config').build({}, container);

    return new WorldRandomGenerator(
      JSON.parse(
        await Util.promisify(fs.readFile)(config.game.world.randomGeneratorPath, 'utf8')
      )
    );
  }
};
