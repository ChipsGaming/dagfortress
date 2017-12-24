const Object = require('../Object');

module.exports = class extends Object{
  constructor(world, location, name){
    super(world, location, name);
    this.owner = null;

    this.lazyLoader = null;
  }

  // Getters
  /**
   * @return {Dynamic} Владелец.
   */
  async getOwner(){
    if(this.owner === null){
      return null;
    }

    return this.lazyLoader.loadOwner(this.owner);
  }
};
