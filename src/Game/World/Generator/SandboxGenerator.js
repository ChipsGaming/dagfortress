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
    return this.container.get('LocationGenerator').build({}, this.container)
      .then(function(locationGenerator){
        const list = new LocationList(
          locationGenerator.generate(this.world.id).setStart(true)
        );

        list
          .createRoad(
            list.startLocation,
            locationGenerator.generate(this.world.id)
          )
          .createRoad(
            list.lastLocation,
            locationGenerator.generate(this.world.id)
          );

        return list;
      }.bind(this));
  }
};
