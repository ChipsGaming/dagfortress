module.exports = class{
  constructor(routers){
    this.routers = routers;
  }

  route(message){
    for(let i in this.routers){
      let match = this.routers[i].route(message);
      if(match === null){
        continue;
      }

      return match;
    }

    return null;
  }
};
