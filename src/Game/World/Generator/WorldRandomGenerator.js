const World = require('../World');

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
  
  generate(seed){
    return new World(
      seed,
      this.randomWith(this.data.names),
      [
        this.randomWith(this.data.locationDescription),
        this.randomWith(this.data.usingDescription)
      ].join('. ')
    );
  }
};
