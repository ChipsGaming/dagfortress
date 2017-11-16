const Location = require('../Location');

module.exports = class{
  constructor(data){
    this.data = data; 
  }

  randomWith(list){
    return list[Math.round(Math.random() * list.length - 1)];
  }
  
  generate(world){
    return new Location(
      world,
      this.randomWith(this.data.names),
      this.randomWith(this.data.locationDescription)
    );
  }
};
