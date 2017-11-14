module.exports = class{
  constructor(regex, names, defaults){
    if(!(defaults instanceof Object)){
      defaults = {};
    }

    this.regex = regex;
    this.names = names;
    this.defaults = defaults;
  }

  route(message){
    if(!('content' in message)){
      return null;
    }

    const match = this.regex.exec(message.content);
    if(match === null){
      return null;
    }

    let result = {};
    for(let i in this.names){
      result[this.names[i]] = match[parseInt(i) + 1];
    }

    return Object.assign(this.defaults, result);
  }
};
