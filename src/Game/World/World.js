const Uuid = require('uuid/v4');

module.exports = class{
  constructor(seed, name, description){
    this.id = Uuid();
    this.seed = seed;
    this.name = name;
    this.description = description;
    this.added = null;
  }

  // Getters
  /**
   * @return {Chrono} Хронология мира.
   */
  async getChrono(){
    return this.lazyLoader.loadChrono(this.id);
  }

  /**
   * @return {Dynamic[]} Динамические объекты мира.
   */
  async getDynamics(){
    return this.lazyLoader.loadDynamics(this.id);
  }

  /**
   * @return {Dynamic[]} Динамические, живые объекты мира.
   */
  async getAliveDynamics(){
    return this.lazyLoader.loadAliveDynamics(this.id);
  }

  /**
   * @return {Player[]} Игроки данного мира.
   */
  async getPlayers(){
    return this.lazyLoader.loadPlayers(this.id);
  }

  /**
   * @return {Integer} Количество игроков в данном мире.
   */
  async getPlayersCount(){
    return this.lazyLoader.loadPlayersCount(this.id);
  }

  /**
   * @return {Integer} Количество живых игроков в данном мире.
   */
  async getAlivePlayersCount(){
    return this.lazyLoader.loadAlivePlayersCount(this.id);
  }

  /**
   * @return {Group} Группа для игроков данного мира.
   */
  async getPlayerGroup(){
    return this.lazyLoader.loadPlayerGroup(this.id);
  }

  /**
   * @return {Task[]} Актуальные задачи в этом мире.
   */
  async getActualTasks(){
    return this.lazyLoader.loadActualTasks(this.id);
  }
};
