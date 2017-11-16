const LocationList = require('./LocationList');
const Location = require('../Location/Location');

module.exports = class{
  constructor(container, world){
    this.container = container;
    this.world = world;
  }

  /**
   * Генерирует массив локаций для данного мира.
   *
   * @return {LocationList} Сгенерированные локации.
   */
  generate(){
    const list = new LocationList(
      new Location(this.world.id).setStart(true)
    );

    list
      .createRoad(
        list.startLocation,
        new Location(this.world.id)
      )
      .createRoad(
        list.lastLocation,
        new Location(this.world.id)
      );

    return list;
  }
};
