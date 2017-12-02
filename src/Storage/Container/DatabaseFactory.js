const Knex = require('knex');

module.exports = class{
  async build(options, container){
    return Knex(require('../../../knexfile'));
  }
};
