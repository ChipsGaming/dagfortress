const Location = require('../Location');

module.exports = class{
  constructor(data){
    this.data = data; 
  }

  randomWith(list){
    if(list.length == 0){
      return '';
    }

    return list[
      Math.floor(Math.random() * list.length)
    ];
  }
  
  generate(world){
    return new Location(
      world,
      this.randomWith(this.data.names),
      this.randomWith(this.data.locationDescription)
    );
  }
};
