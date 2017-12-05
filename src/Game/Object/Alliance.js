const Uuid = require('uuid/v4'),
  WinEvent = require('./Event/WinEvent');

module.exports = class{
  constructor(world, name){
    this.id = Uuid();
    this.world = world;
    this.name = name;
    this.added = null;
  }

  // Getters
  /**
   * @return {World} Мир, которому принадлежит альянс.
   */
  async getWorld(){
    return this.lazyLoader.loadWorld(this.world);
  }

  // Actions
  /**
   * Регистрирует победу альянса.
   *
   * @param {EventJournal} events Журнал событий.
   */
  win(events){
    events.trigger(new WinEvent(this));
  }
};
