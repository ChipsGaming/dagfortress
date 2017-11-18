const Knex = require('knex');

module.exports = class{
  async build(options, container){
    return Promise.resolve(
      Knex(require('../../../knexfile'))
    );
  }
};
