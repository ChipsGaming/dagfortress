const Uuid = require('uuid/v4');

module.exports = class{
  constructor(world, name, description){
    this.id = Uuid();
    this.world = world;
    this.name = name;
    this.description = description;
    this.added = null;
  }

  // Getters
  /**
   * @return {World} Мир, к которому относится локация.
   */
  async getWorld(){
    return this.lazyLoader.loadWorld(this.world);
  }
  
  /**
   * @return {Location[]} Соседние локации.
   */
  async getNearbyLocations(){
    return this.lazyLoader.loadNearbyLocations(this.id);
  }

  /**
   * @return {Dynamic[]} Динамические объекты, присутствующие в данной локации.
   */
  async getDynamics(){
    return this.lazyLoader.loadDynamics(this.id);
  }

  /**
   * @return {Dynamic[]} Живые динамические объекты, присутствующие в данной 
   * локации.
   */
  async getAliveDynamics(){
    return this.lazyLoader.loadAliveDynamics(this.id);
  }
};
