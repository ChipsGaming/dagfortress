const EntityRepository = require('../../../Storage/EntityRepository');
const Entity = require('../Player');

module.exports = class extends EntityRepository{
  get tableName(){
    return 'player';
  }

  extract(entity){
    entity.added = new Date;

    return {
      id: entity.id,
      discordUser: entity.discordUser,
      world: entity.world,
      location: entity.location,
      added: entity.added
    };
  }

  hydrate(data){
    const entity = new Entity(
      data.discordUser,
      data.world,
      data.location
    );
    entity.id = data.id;
    entity.added = new Date(data.added);

    return entity;
  }

  isNew(entity){
    return entity.added === null;
  }
};
