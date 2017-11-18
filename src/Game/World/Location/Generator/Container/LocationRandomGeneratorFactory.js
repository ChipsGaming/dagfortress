const fs = require('fs');
const Util = require('util');
const LocationRandomGenerator = require('../LocationRandomGenerator');

module.exports = class{
  async build(options, container){
    const config = await container.get('Config').build({}, container);

    return new LocationRandomGenerator(
      JSON.parse(
        await Util.promisify(fs.readFile)(config.game.world.location.randomGeneratorPath, 'utf8')
      )
    );
  }
};
