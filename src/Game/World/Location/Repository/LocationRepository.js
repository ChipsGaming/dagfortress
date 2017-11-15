const Repository = require('./../../../../Storage/Repository');
const WorldQueryBuilder = require('./WorldQueryBuilder');
const Squel = require('squel');

module.exports = class extends Repository{
  createQueryBuilder(alias = 'world'){
    return new WorldQueryBuilder(
      Squel.select().from('world', alias)
    );
  }
};
