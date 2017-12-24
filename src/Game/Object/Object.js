const Uuid = require('uuid/v4');

module.exports = class{
  constructor(world, location, name){
    this.id = Uuid();
    this.world = world;
    this.location = location;
    this.name = name;
    this.added = null;

    this.lazyLoader = null;
  }

  // Getters
  /**
   * @return {World} Мир, которому принадлежит объект.
   */
  async getWorld(){
    return this.lazyLoader.loadWorld(this.world);
  }

  /**
   * @return {Location} Текущая локация объекта.
   */
  async getCurrentLocation(){
    return this.lazyLoader.loadLocation(this.location);
  }
};
