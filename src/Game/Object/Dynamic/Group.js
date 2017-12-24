const Uuid = require('uuid/v4');

module.exports = class{
  constructor(alliance, name){
    this.id = Uuid();
    this.alliance = alliance;
    this.name = name;
    this.isPlayer = false;
    this.maxPlayers = null;
    this.startLocation = null;
    this.ai = {
      'getTarget': __dirname + '/AI/Default/Attack/GetTargetAI.js',
      'getDamage': __dirname + '/AI/Default/Attack/GetDamageAI.js',
      'getCurrentTask': __dirname + '/AI/Default/Task/GetCurrentTaskAI.js',
      'getNextLocation': __dirname + '/AI/Default/Move/GetNextLocationAI.js'
    };
    this.added = null;

    this.lazyLoader = null;
  }

  // Getters
  /**
   * @return {AI} Искусственный интеллект объекта.
   */
  async getAI(){
    return await this.lazyLoader.loadAI(this.ai);
  }

  /**
   * @return {Alliance} Альянс, в которую входит группа.
   */
  async getAlliance(){
    return this.lazyLoader.loadAlliance(this.alliance);
  }

  /**
   * @return {Location} Стартовая локация группы.
   */
  async getStartLocation(){
    if(this.startLocation === null){
      return null;
    }

    return this.lazyLoader.loadStartLocation(this.startLocation);
  }

  /**
   * @return {Integer} Число игроков в группе.
   */
  async getPlayersCount(){
    return this.lazyLoader.loadPlayersCount(this.id);
  }
};
