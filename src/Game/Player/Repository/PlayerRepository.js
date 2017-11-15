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
      added: entity.added
    };
  }

  hydrate(data){
    const entity = new Entity(
      data.id,
      data.discordUser
    );
    entity.world = data.world;
    entity.added = new Date(data.added);

    return entity;
  }

  isNew(entity){
    return entity.added === null;
  }
};
