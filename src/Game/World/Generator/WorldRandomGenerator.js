const World = require('../World');

module.exports = class{
  constructor(data){
    this.data = data; 
  }

  randomWith(list){
    return list[Math.round(Math.random() * list.length - 1)];
  }
  
  generate(seed){
    return new World(
      seed,
      this.randomWith(this.data.names),
      this.randomWith(this.data.locationDescription) + '. ' + this.randomWith(this.data.usingDescription)
    );
  }
};
