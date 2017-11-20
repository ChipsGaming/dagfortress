const fs = require('fs');
const Util = require('util');
const TranslateHelper = require('../Helper/TranslateHelper');

module.exports = class{
  async build(options, container){
    const tl = new TranslateHelper(
      JSON.parse(
        await Util.promisify(fs.readFile)('./locale/ru_RU.json', 'utf8')
      )
    );

    return {
      tl: () => tl.invoke.bind(tl)
    };
  }
};
