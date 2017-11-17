const EntityRepository = require('../../Repository/DynamicRepository');
const QueryBuilder = require('./PlayerQueryBuilder');
const Entity = require('../Player');

module.exports = class extends DynamicRepository{
  get tableName(){
    return 'player';
  }

  extract(entity){
    const data = super.extract(entity);

    data.discordUser = entity.discordUser;

    return data;
  }

  hydrate(data){
    const entity = super.hydrate(data);

    entity.discordUser = data.discordUser;

    return entity;
  }

  save(entity){
    super(entity);

    if(this.isNew(entity)){
      return this.database
        .insert(this.extract(entity))
        .into(this.tableName);
    }
    else{
      return this.database
        .update(this.extract(entity))
        .from(this.tableName)
        .where('id', entity.id);
    }
  }

  find(field, value){
  }

  select(alias = 'e'){
    return new QueryBuilder(
      this.database
        .select(`${this.tableName}.*`)
        .from(this.tableName),
      alias
    );
  }
};
