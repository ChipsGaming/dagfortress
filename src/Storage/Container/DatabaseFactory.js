const Knex = require('knex');

module.exports = class{
  build(options, container){
    return new Promise(function(resolve, reject){
      resolve(Knex(require('../../../knexfile')));
    });
  }
};
