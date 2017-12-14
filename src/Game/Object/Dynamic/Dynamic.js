const Object = require('../Object');

module.exports = class extends Object{
  constructor(world, location, group, name){
    super(world, location, group, name);
    this.endurance = 3;
    this.currentEndurance = this.endurance;
    this.isDie = false;
    this.ai = {
      'attack': __dirname + '/AI/Default/Attack.js',
      'task': __dirname + '/AI/Default/Task.js',
      'move': __dirname + '/AI/Default/Move.js'
    };

    this.lazyLoader = null;
  }

  // Getters
  /**
   * @return {Organ[]} Органы объекта.
   */
  async getOrgans(){
    return this.lazyLoader.loadOrgans(this.id);
  }

  /**
   * @return {Organ[]} Ноги объекта.
   */
  async getLegs(){
    return this.lazyLoader.loadLegs(this.id);
  }

  /**
   * @return {Dynamic[]} Органы объекта.
   */
  async getNearbyDynamics(){
    return await this.lazyLoader.loadNearbyDynamics(this);
  }

  /**
   * @return {AI} Искусственный интеллект объекта.
   */
  async getAI(){
    return await this.lazyLoader.loadAI(this);
  }
};
