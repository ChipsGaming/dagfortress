const Uuid = require('uuid/v4');

module.exports = class{
  constructor(alliance, name){
    this.id = Uuid();
    this.alliance = alliance;
    this.name = name;
    this.isPlayer = false;
    this.startLocation = null;
    this.added = null;
  }

  // Getters
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
};
